import React from 'react';
import "./Question.css";
import Option from "./Option";
import { useContext } from 'react';
import { QuizContext } from '../context/quiz';

const Questions = () => {

  const [quizState, dispatch] = useContext(QuizContext);

  const currentQuest = quizState.questions[quizState.currentQuestion];

  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: {answer: currentQuest.answer, option},
      //o payload envia dados para o reducer
      //currentQuest.answer é a resposta correta
      //e option é a resposta do usuário
    })
  };

  return (
    <div id='question'>
      <p>
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>
      <h2>{currentQuest.question}</h2>
      <div id="options-container">
        {currentQuest.options.map((option) => (
          <Option 
            option={option} 
            key={option} 
            answer={currentQuest.answer}
            selectOption={() => onSelectOption(option)}
            hide={quizState.optionToHide === option ? "hide" : null}
          />
        ))}
      </div>
      {!quizState.answerSelected && !quizState.help && (
        <>
          {currentQuest.tip && (//Verifica se tem dica 
            <button onClick={() => dispatch({ type: "SHOW_TIP" })}>Dica</button>
          )}

          <button onClick={() => dispatch({ type: "REMOVE_OPTION" })}>
            Excluir uma
          </button>
        </>
      )}

      {!quizState.answerSelected &&
          quizState.help === "tip" && (
            <p className='tip'>{currentQuest.tip}</p>
      )}

      {quizState.answerSelected && 
        <button onClick={() => dispatch({type: "CHANGE_QUESTION"})}>
          Continuar
        </button>  
      }
    </div>
  );
};

export default Questions;