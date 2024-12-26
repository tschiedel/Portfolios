import React, { useContext } from 'react';
import './Home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//context
import { CountdownContext } from '../context/CountdownContext';

const Home = () => {

    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [url, setUrl] = useState();
    const [color, setColor] = useState();

    const {event, setEvent} = useContext(CountdownContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventObject = {
            title,
            date,
            url,
            color,
        }

        setEvent(eventObject); // armazena os dados no context
        navigate("/countdown"); // redireciona para pg de countdown
    };

  return (
    <div className='home'>

      <h2>Monte a sua contagem regressiva!</h2>

      <form className="countdown-form" onSubmit={handleSubmit}>
        <label>
            <span>Título:</span>
            <input 
                type="text"
                name="title" 
                placeholder='Digite o título do evento'
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </label>

        <label>
            <span>Data do evento:</span>
            <input 
                type="date" 
                name="date"
                onChange={(e) => setDate(e.target.value)}
                required
            />
        </label>

        <label>
            <span>Imagem:</span>
            <input 
                type="text" 
                name="image" 
                placeholder='Digite a URL da imagem'
                onChange={(e) => setUrl(e.target.value)}
            />
        </label>

        <label>
            <span>Cor do tema:</span>
            <input 
                type="color" 
                name="color"
                onChange={(e) => setColor(e.target.value)}
            />
        </label>

        <input type="submit" value="Enviar" />

      </form>
    </div>
  );
};

export default Home;
