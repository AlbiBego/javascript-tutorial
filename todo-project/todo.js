const notes = JSON.parse(localStorage.getItem('notes')) || [];

document.querySelector('.js-add-button').addEventListener('click', addNote);

if(notes.length !== 0)
{
  renderNotes(notes);
}

function addNote()
{
  const noteInputElement = document.querySelector('.js-note-input');
  const noteDateElement = document.querySelector('.js-date-input');

  const note = 
  {
    noteContent: '',
    date: ''
  };

  note.noteContent = noteInputElement.value;
  note.date = noteDateElement.value;

  notes.push(note);

  localStorage.setItem('notes', JSON.stringify(notes));

  renderNotes(notes);

  noteInputElement.value = '';

}

function removeNote(index)
{
  notes.splice(index, 1);

  localStorage.setItem('notes', JSON.stringify(notes));

  renderNotes(notes);
}

function renderNotes(notes)
{
  const todoListElement = document.querySelector('.todo-grid');

  let html = '';

  notes.forEach(
    (value, index) =>
    {
      html += `
      <p class="note-content">${value.noteContent}</p>
      <p class="date">${value.date}</p>
      <button class="js-remove-button remove-button">remove</button>
      `;
    });

  todoListElement.innerHTML = html;

  const deleteButtonList = document.querySelectorAll('.js-remove-button');

  // for(let i = 0 ; i < deleteButtonList.length; i++)
  // {
  //   deleteButtonList[i].addEventListener('click', () => {removeNote(i);});
  // };

  deleteButtonList.forEach(
    (value, index) =>
    {
      value.addEventListener('click', () => 
      {
        removeNote(index);
      });
    }
  );
}

function keysHandling(event)
{
  if(event.key === 'Enter')
  {
    addNote();
  }
}