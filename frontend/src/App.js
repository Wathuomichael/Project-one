import { useEffect, useState } from 'react';
import axios from 'axios';
import Time from './Time';
import Greeting from './Greeting';
import CreateNote from './CreateNote';
import Quote from './Quote';
import { FaTrashAlt } from 'react-icons/fa'


function App() {

  const [list, setList] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const client_id = process.env.REACT_APP_CLIENT_ID;

  const getNotes = async() => {
    const response = await axios.get('http://localhost:5000/')
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

  useEffect(() => {
    axios.get(`https://api.unsplash.com/photos/random?query=scenic&client_id=${client_id}`)
    .then(response => setImage(response.data.urls.full))
    .then(() => setIsLoading(false));
  },[]);

  document.body.style.backgroundImage = `url(${image})`;


  if(isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if(isAdded) {
    return (
      <div className='main'>
        <div className='time'><Time /></div>
        <div className='greeting'><Greeting /></div>
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
        <div className='quote'><Quote /></div>
      </div>
    );
  } else {
      return (
        <div className='main'>
          <div className='time'><Time /></div>
          <div className='greeting'><Greeting /></div>
          <div className='create-note'><CreateNote clicked={addNote}/></div>
          <div className='quote'><Quote /></div>
        </div>
      );
  }

    
}

export default App;
