import { useEffect, useState } from 'react';
import axios from 'axios';
import Time from './Time';
import Greeting from './Greeting';
import CreateNote from './CreateNote';
import { FaTrashAlt } from 'react-icons/fa'


function App() {

  const [list, setList] = useState([]);
  const [trigger, setTrigger] = useState(true);

  const getNotes = async() => {
    const response = await axios.get('http://localhost:5000/');
    setList(response.data);
    console.log(response);
  }

  useEffect(() => {
    getNotes();
  }, [trigger]);

  const addNote = async(note) => {
    const payload = {
      note
    }
    await axios.post('http://localhost:5000/', payload);
    setTrigger(!trigger);
  }

  const deleteNote = async(id) => {
    await axios.delete(`http://localhost:5000/${id}`);
    setTrigger(!trigger);
  }

  return (
    <div className='main'>
      <div className='time'><Time /></div>
      <div className='greeting'><Greeting /></div>
      <div className='create-note'><CreateNote clicked={addNote}/></div>
      {list.map((item) => {
          return (
            <div className='list' key={item._id}>
              <p className='note'>{item.note}</p>
              <button className='delete-button' onClick={() => {
                deleteNote(item._id);
              }}><FaTrashAlt /></button>
            </div>
          );
      })}
    </div>
  );
}

export default App;
