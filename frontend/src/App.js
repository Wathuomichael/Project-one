import Time from './Time';
import Greeting from './Greeting';
import CreateNote from './CreateNote';

function App() {
  return (
    <div className='main'>
      <div className='time'><Time /></div>
      <div className='greeting'><Greeting /></div>
      <div className='create-note'><CreateNote /></div>
    </div>
  );
}

export default App;
