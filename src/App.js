import React, { useState } from 'react';
import './App.css';
import Preview from './components/Preview'
import Message from './components/Message';

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const getAddNote = () => {
    return (
      <div>
        <h2>إضافة ملاحظة جديدة</h2>
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="العنوان"
            value={title}
            onChange={changeTitleHandler}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="النص"
            value={content}
            onChange={changeContentHandler}
          />

          <a href="#" className="button green" onClick={saveNoteHandler}>
            حفظ
          </a>
        </div>
      </div>
    );
  };

  // Save a Note
  const saveNoteHandler = () => {
    const note = {
      id: new Date(),
      title: title,
      content: content
    }

    const updatedNote = [...notes, note];
    setNotes(updatedNote);
    setCreating(false);
    setSelectedNote(note.id);
    setTitle('');
    setContent('');
  }

  // Change the Title
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  }

  // Change the Content
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  }

  const getPreview = () => {


    if (notes.length === 0) {
      return <Message title='There is no Notes yet' />
    }
    if (!selectedNote) {
      return <Message title='Please select a Note' />
    }

    const note = notes.find(note => {
      return note.id === selectedNote;
    });
    return (
      <div>
        <div className="note-operations">
          <a href="#">
            <i className="fa fa-pencil-alt" />
          </a>
          <a href="#">
            <i className="fa fa-trash" />
          </a>
        </div>
        <div>
          <h2> {note.title} </h2>
          <p>{note.content}</p>
        </div>
      </div>
    );
  };

  const addNoteHandler = () => {
    setCreating(true);
  }

  return (
    <div className="App">
      <div className="notes-section">
        <ul className="notes-list">
          <li className="note-item">ملاحظة رقم #1</li>
          <li className="note-item">ملاحظة رقم #2</li>
          <li className="note-item">ملاحظة رقم #3</li>
          <li className="note-item">ملاحظة رقم #4</li>
        </ul>
        <button className="add-btn" onClick={addNoteHandler}>+</button>
      </div>
      <Preview className="preview-section">{creating ? getAddNote() : getPreview()}</ Preview>
    </div>
  );
}

export default App;
