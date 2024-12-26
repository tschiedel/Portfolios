import "./Button.css";
import React from 'react';
 
 const Button = ({ text, id, action}) => {

  //Dessa forma o botão consegue utilizar qualquer função 
  //de forma dinâmica, esta recebe uma função via props

  const handleAction = (e) => {
    action(e);
  };

   return (
     <button id={id} onClick={handleAction}>{text}</button>
   );
 };
 
 export default Button;
 