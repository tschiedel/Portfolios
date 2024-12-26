import './App.css';
import { useContext, useEffect } from 'react';
import { QuizContext } from './context/quiz';
import Welcome from './components/Welcome';
import Question from './components/Question';
import GameOver from './components/GameOver';
import PickCategory from './components/PickCategory';

function App() {

  //tendo acesso ao estágio do quiz
  const [quizState, dispatch] = useContext(QuizContext);

  {/*useEffect(() => {
    //embaralhar perguntas que vem do arquivo questions
    dispatch({type: "REORDER_QUESTIONS"});
  }, []); // executa apenas uma vez quando a aplicação começa*/}

  return (
    <div className='app'>
      <h1>Quiz da Programação</h1>
      {/*tendo acesso ao estágio do quiz*/}
      {quizState.gameStage === "Start" && <Welcome/>}
      {quizState.gameStage === "Category" && <PickCategory/>}
      {quizState.gameStage === "Playing" && <Question/>}
      {quizState.gameStage === "End" && <GameOver/>}
    </div>
  );
};

export default App;
