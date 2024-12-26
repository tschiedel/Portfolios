import './App.css';
import { Outlet } from 'react-router-dom';
import Fundo from './img/fundo.jpg';

//context
import { useContext } from 'react';
import { CountdownContext } from './context/CountdownContext';

function App() {

  const {event} = useContext(CountdownContext);

  let eventImage = null;

  if(event) eventImage = event.url;
  console.log(eventImage);

  return (
    <div className='app' style={
      eventImage ? 
      {backgroundImage: `url(${eventImage})`} : 
      {backgroundImage: `url(${Fundo})`}}
    >
      <div className='container'>
        <Outlet/>
      </div>
    </div>
  );
};

export default App;
