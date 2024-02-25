let noteTitle = document.getElementById("Note-Title");
let desCription = document.getElementById("des-cription");
let addBtn = document.getElementById("add-btn");
let showText = document.getElementById("show-text");
let cardIdCounter = parseInt(localStorage.getItem("cardIdCounter")) || 1;
let selectedCardIndex = null;

addBtn.addEventListener("click", function () {
  if(noteTitle.value === "" && desCription.value === "") {
    alert("title or desription is empty");
    return;
  }
  if (selectedCardIndex !== null) {
    saveUpdatedCard(selectedCardIndex);
  } else {
    addInputValue();
  }
});
//when adding a new card
function addInputValue() {
  let currentDate = new Date();
  let currentTime = currentDate.toLocaleTimeString();
  let currentDateString = currentDate.toDateString();

  // Retrieve existing note cards from local storage
  let existingCards = JSON.parse(localStorage.getItem("noteCards")) || [];

  // Create a new note card object
  let newCard = {
    id: cardIdCounter++,
    title: noteTitle.value,
    description: desCription.value,
    timestamp: `${currentTime} ${currentDateString}`,
  };

  localStorage.setItem("cardIdCounter", cardIdCounter);
  // Add the new note card to the array
  existingCards.push(newCard);

  // Store the updated array in local storage
  localStorage.setItem("noteCards", JSON.stringify(existingCards));
  selectedCardIndex = null;
  // Display all note cards
  showCards();
  noteTitle.value = "";
  desCription.value = "";
}

function removeCard(index) {
  // Retrieve existing note cards from local storage
  let existingCards = JSON.parse(localStorage.getItem("noteCards")) || [];

  // Remove the note card at the specified index from the array
  existingCards.splice(index, 1);

  // Store the updated array in local storage
  localStorage.setItem("noteCards", JSON.stringify(existingCards));

  // Display all note cards
  showCards();
}

function updateCard(index) {
  let existingCards = JSON.parse(localStorage.getItem("noteCards")) || [];
  let selectedCard = existingCards[index];

  // Set input values with the data from the selected card
  noteTitle.value = selectedCard.title;
  desCription.value = selectedCard.description;

  // Set selectedCardIndex for update mode
  selectedCardIndex = index;
}

function saveUpdatedCard(index) {
  //fetch the object
  let existingCards = JSON.parse(localStorage.getItem("noteCards")) || [];

  // Update the selected card with new values
  existingCards[index].title = noteTitle.value;
  existingCards[index].description = desCription.value;
  existingCards[index].timestamp =
    new Date().toLocaleTimeString() + " " + new Date().toDateString();

  // Supdated the fetched  note object
  localStorage.setItem("noteCards", JSON.stringify(existingCards));

  // rested and ready to add new card
  selectedCardIndex = null;

  // Display all note cards
  showCards();
  noteTitle.value = "";
  desCription.value = "";
}

function showCards() {
  let data = localStorage.getItem("noteCards");
  let allCards = JSON.parse(data) || [];

  // Display all note cards
  showText.innerHTML = "";
  allCards.forEach((card, index) => {
    showText.innerHTML += `<div class="note-card">
            <div class="note-header">
                <p class="note-title">${card.title}</p>
            </div>
            <div class="note-body">
                <p class="note-description">${card.description}</p>
            </div>
            <div class="note-footer">
                <p class="note-meta">${card.timestamp}</p>
              
                <button onclick="removeCard(${index})"><i class="fa fa-trash"></i></button>
              
                <button onclick="updateCard(${index})"><i class="fa fa-edit"></i></button>
            </div>
        </div>`;
  });
}

// Initial display of note cards when the page loads
showCards();
