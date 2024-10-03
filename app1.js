const noteInputEl = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNote");
const noteListEl = document.getElementById("noteList");

let notes = [];

function renderNotes() {
    noteListEl.innerHTML = "";

    notes.forEach((note, index) => {
        const noteItemEl = document.createElement("li");
        noteItemEl.textContent = note;

        const editBtn = document.createElement("button");
        editBtn.textContent = "edytuj";
        editBtn.onclick = () => {
            const newNote = prompt("edytuj notatkę:", note);
            if (newNote !== null) {
                editNote(index, newNote);
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Usuń";
        deleteBtn.onclick = () => {
            removeNote(index);
        };

        noteItemEl.appendChild(editBtn);
        noteItemEl.appendChild(deleteBtn);
        noteListEl.appendChild(noteItemEl);

    });


}

function addNote() {
    const noteText = noteInputEl.value.trim();
    if (noteText) {
        notes.push(noteText);
        noteInputEl.value = "";
        saveNotes();
        renderNotes();
    } else {
        alert("Proszę wpisać notatkę.");
    }
}

function removeNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function editNote(index, newNote) {
    notes[index] = newNote;
    saveNotes();
    renderNotes();
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
    renderNotes();
}

addNoteBtn.addEventListener("click", addNote);

loadNotes();