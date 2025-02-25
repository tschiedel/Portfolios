import React from 'react';
import "./Option.css";

import { useContext } from 'react';
import { QuizContext } from '../context/quiz';

const Option = ({ option, selectOption, answer, hide }) => {

    const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div 
        className={`option 
            ${quizState.answerSelected && option === answer ? 'correct' : ''}
            ${quizState.answerSelected && option !== answer ? 'wrong' : ''}
            ${hide ? "hide" : ""}`
        } 
        onClick={() => selectOption()}
    >
        {/*Verifica se a opção está selecionada 
        e atribui as classes de acordo com a resposta certa ou errada */}
      <p>{option}</p>
    </div>
  );
};

export default Option;
