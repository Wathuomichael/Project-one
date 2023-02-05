import { useEffect, useState } from 'react';
import axios from 'axios';
import Time from './Time';
import Greeting from './Greeting';
import CreateNote from './CreateNote';
import Quote from './Quote';
import Weather from './Weather';
import { FaTrashAlt } from 'react-icons/fa';
import Background from './Background';


function App() {

  const [list, setList] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const apiNinjasKey = process.env.REACT_APP_API_NINJAS_KEY;

  const getNotes = async() => {
    const response = await axios.get('http://localhost:5000/');
    setList(() => {
      if(response.data.length > 0) {
        setIsAdded(true);
      }
      return response.data;
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getNotes();
  }, [trigger]);

  const addNote = async(note) => {
    const payload = {
      note
    }
    await axios.post('http://localhost:5000/', payload);
    setIsAdded(true);
    setTrigger(!trigger);
  }

  const deleteNote = async(id) => {
    await axios.delete(`http://localhost:5000/${id}`);
    setIsAdded(false);
    setTrigger(!trigger);
  }


  if(isLoading) {
    return (
      <div class="lds-ripple"><div></div><div></div></div>
    );
  } else if(isAdded) {
    return (
      <div className='main'>
        <Weather />
        <Time />
        <Greeting />
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
        <Quote />
        <Background />
      </div>
    );
  } else {
      return (
        <div className='main'>
          <Weather />
          <Time />
          <Greeting />
          <CreateNote clicked={addNote}/>
          <Quote />
          <Background />
        </div>
      );
  }

    
}

export default App;