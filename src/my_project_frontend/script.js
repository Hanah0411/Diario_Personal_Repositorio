document.addEventListener('DOMContentLoaded', async () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesContainer = document.getElementById('notes-container');

    // Importa el canister idl y actor
    const { my_project_backend } = await import('ic:canisters/my_project_backend');

    // Cargar notas desde el servidor al inicio
    loadNotes();

    addNoteBtn.addEventListener('click', async () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            await addNoteAndSaveToServer(noteText);
            noteInput.value = '';
        }
    });

    function addNoteToDOM(noteText) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.textContent = noteText;
        notesContainer.appendChild(noteElement);
    }

    async function addNoteAndSaveToServer(noteText) {
        addNoteToDOM(noteText);

        try {
            await my_project_backend.addNote(noteText);
        } catch (error) {
            console.error('Error al agregar la nota al servidor:', error);
        }
    }

    async function loadNotes() {
        try {
            const notes = await my_project_backend.getNotes();
            notes.forEach(noteText => addNoteToDOM(noteText));
        } catch (error) {
            console.error('Error al cargar las notas desde el servidor:', error);
        }
    }
});
