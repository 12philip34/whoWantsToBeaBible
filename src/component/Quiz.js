import '../CSS/Quiz.css';
import '../App.css';
import { useState, useEffect, Fragment, useMemo } from 'react';
import api from '../services/api'
import './Register';
import thumbsup from '../images/thumbsup.png';
import thumbsDown from '../images/thumbsDown.png';
import useSound from "use-sound";
import play from "../SoundTracks/main.mp3";
import correct from "../SoundTracks/correct.mp3";
import wrong from "../SoundTracks/wrong.mp3";

// const data = [
//   {question: 'hello', options: ['sds','fds','re','ds'], answer: 'sds'}
// ]


let answerPoints = 0;
const Quiz = (nextFacet) => {

  localStorage.setItem('gamePoint', 0);
  const [data, setData] = useState([])
  const [questionCount, setQuestionCount] = useState(0);
  const [counter, setCounter] = useState(60) // in seconds
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [earned, setEarned] = useState("$ 0");
  const [letsPlay] = useSound(play);
  const [theCorrectAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  //  Container responsible to call the next Question
  useEffect(() => {
    const gameIsOver = document.getElementById('gameOver');
// debugger
    if (data.length && questionCount >= data.length) {
      gameIsOver.style.display = 'block';
      localStorage.setItem('gamePoint', answerPoints);
      const displayName = document.getElementById('name');
      const displayPoints = document.getElementById('points');
      // if (Number(localStorage.getItem('gamePoint')) > 1) {
      //   displayPoints.innerText = localStorage.getItem('gamePoint') + ' points';
      // }
      // else {
      //   displayPoints.innerText = localStorage.getItem('gamePoint') + ' point';
      // }

      displayName.innerText = localStorage.getItem('gamerName');
    }
    // return console.log(questionCount)
  }, [questionCount])

  const getQuizzes = async () => {
    const res = (await api.get('quiz')).data
    
    if (res.data) {
      res.data.forEach(item => {
        item.options = item.options.split(',')
      })
      setData(res.data)
    }
  }

  //call a friend function/////////////
  useEffect(() => {
    
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    const gameIsOver = document.getElementById('gameOver');
    if (counter === 0) {
      document.getElementById('gameOver').style.display = 'block';
      sessionStorage.setItem('gamePoint', answerPoints);
      const displayName = document.getElementById('name');
      const displayPoints = document.getElementById('points');

      if (Number(localStorage.getItem('gamePoint')) > 1) {
        displayPoints.innerText = localStorage.getItem('gamePoint') + ' points';
      }
      else {
        displayPoints.innerText = localStorage.getItem('gamePoint') + ' point';
      }
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter])

  const openButton = (event) => {

    setSelectedAnswer(event.target.innerText)
    const mainModal = document.getElementById('modalcontainer');
    const modalText = document.getElementById('textModal')
    mainModal.style.display = 'block';
    modalText.innerText = `Is this your final answer!!?`;


  }
  const closeButton = () => {
    const mainModal = document.getElementById('modalcontainer');
    mainModal.style.display = 'none';
  }

 
 
  const correctAnswer = () => {
    const currentQuestion = data[questionCount];
    const decision = document.getElementById('verdict')
    const mainDecision = document.getElementById('decisionModal')
    const mainModal = document.getElementById('modalcontainer');
    const thumbsIsUp = document.getElementById('thumbsUp');
    const thumbsIsDown = document.getElementById('thumbsDown');
    const options = document.querySelectorAll('.Opt');

   
  
    //  console.log(selectedAnswer)
    if (selectedAnswer === currentQuestion.answer) {
      mainModal.style.display = 'none';
      mainDecision.style.display = 'block';
      decision.innerText += `correct Answer`;
      thumbsIsUp.style.display = 'block';
      answerPoints++;
      theCorrectAnswer();
    }
    else {
      mainModal.style.display = 'none';
      mainDecision.style.display = 'block';
      decision.innerText += `wrong Answer`;
      thumbsIsDown.style.display = 'block';
      wrongAnswer();
    }

    options.forEach(option => {
      option.classList.remove('disable-el')
    })

    if (questionCount < data.length) {
      setQuestionCount(questionCount + 1)
    } else {
      // summarize
      gameIsOver.style.display = 'block';
      localStorage.setItem('gamePoint', answerPoints);
      const displayName = document.getElementById('name');
      const displayPoints = document.getElementById('points');
      if (Number(localStorage.getItem('gamePoint')) > 1) {
        displayPoints.innerText = localStorage.getItem('gamePoint') + ' points';
      }
      else {
        displayPoints.innerText = localStorage.getItem('gamePoint') + ' point';
      }

      displayName.innerText = localStorage.getItem('gamerName');
    }
    const doDisableAudience = () => {
      setIsDisabled(false);
    }

    setTimeout(() => {
      thumbsIsUp.style.display = 'none';
      mainDecision.style.display = 'none';
      thumbsIsDown.style.display = 'none';
      decision.innerText = '';
    }, 3000);


  }
  // fifty-fifty function

  const fiftyFifty = () => {
    const currentQuestion = data[questionCount];
    const hidFifty = document.getElementById('fifty');
    let toBeHidden = []
    hidFifty.style.display = 'none';
    let options = document.querySelectorAll('.Opt')

    options.forEach(option => {
      if (option.value !== currentQuestion.answer) {
        toBeHidden.push(option)
      }
    })
    const shuffled = toBeHidden.sort(() => 0.5 - Math.random());

    let selected = shuffled.slice(0, 2);
    selected.forEach(item => {
      item.classList.add('disable-el')
    })
    localStorage.setItem('hidAllLiveLines', false);
  }

  const callFriend = () => {
    // e.preventDefault()
    // debugger
    const contact = document.getElementById('contact');
    const num = localStorage.getItem('gamerNumber')

    if (num) {
      contact.href = `tel:${num}`;
      contact.click()

      

    }
    localStorage.setItem('hidAllLiveLines', false);
  }


  // walkAway function////////
  let gameIsOver = document.getElementById('gameOver');
  const walkAway = () => {
    const Away = document.getElementById('walkAway');
    document.getElementById('gameOver').style.display = 'block';
    sessionStorage.setItem('gamePoint', answerPoints);
    Away.style.display = 'none';
    const displayName = document.getElementById('name');
    const displayPoints = document.getElementById('points');

    if (Number(localStorage.getItem('gamePoint')) > 1) {
      displayPoints.innerText = localStorage.getItem('gamePoint') + ' points';
    }
    else {
      displayPoints.innerText = localStorage.getItem('gamePoint') + ' point';
    }
    displayName.innerText = localStorage.getItem('gamerName');
    localStorage.setItem('hidAllLiveLines', false);
  }

  // DisableQuiz or ask the audience function//////
  const [isDisabled, setIsDisabled] = useState(false);
  const doDisableAudience = () => {
    setIsDisabled(true);
  }
  const askAudience = () => {
    // const Audience = document.getElementById('askAudience');
    let timeOff = document.getElementById('Timer');
    // Audience.style.display ='none';
    timeOff.style.display = 'none';
    // localStorage.setItem('hidAllLiveLines', false);
  }



  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    getQuizzes()
    debugger
    questionCount > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionCount - 1).amount);
  }, [questionCount > 1, moneyPyramid]);

  return (
    <div className='mainContainer'>


      <div className='container' id='content'>{
        questionCount < data.length ?
          <div style={{ height: 'auto', padding: '4rem' }}>
            <div className='countDown' id='Timer'>
              Countdown: {counter}
            </div>
            <div>
              {/* <div className='button' onClick={openButton}>Open</div> */}
            </div>
            <div className='classQuestion'>
              {`${data[questionCount].question}`}
            </div>

            {/* quiz answers */}
            <div className='QAnswer'>

              {data.length && data[questionCount].options.map((option, i) => (
                <h1 id={i} key={i} className='Opt' onClick={openButton}>{option}</h1>
              ))}
            </div>
            {/* <button onClick={next}>Next Question</button> */}
            <button className='LiveLines' onClick={fiftyFifty} id='fifty'>FiftyX2</button>
            <a href='' className='LiveLines callBtn' id='contact' onClick={callFriend}>
              CallaFriend
            </a>
            <button className='LiveLines' onClick={askAudience} id='askAudience'
              disabled={isDisabled}
            >Audience</button>
            <button className='LiveLines' onClick={walkAway} id='fifty'>Walk Away</button>
            {/* ///////////////////////// */}
            <Fragment>
              <div id='modalcontainer'>
                <div id='modal'>
                  <h1 id='textModal'>
                    {/* text goes in here */}
                  </h1>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div className='button' onClick={closeButton}>No</div>
                    <div className='button' onClick={correctAnswer}>Yes</div>
                  </div>
                </div>
              </div>
              <div id="decisionModal">
                <div id="verdict">
                  {/* Decision Modal */}

                </div>
                <img id='thumbsUp' src={thumbsup} alt='thumbsUp' />
                <img id='thumbsDown' src={thumbsDown} alt='thumbsDown' />
              </div>
            </Fragment>
            <div id="gameOver">
              <h1>GAME OVER!!!</h1>
              <h2 className='endText'>Congraulations, You earned:<span>{earned}</span> </h2>
            </div>
          </div> :
          <div id="gameOver">
            <h1>GAME OVER!!!</h1>
            <h2 className='endText'><span id="name"></span>,you won:{earned}</h2>
          </div>
      }</div>

      <div className='number'>
        <div className="pyramid">
          <ul className="moneyList">
            {moneyPyramid.map((m) => (
              <li
                className={
                  questionCount === m.id
                    ? "moneyListItem active"
                    : "moneyListItem"
                }
              >
                <span className="moneyListItemNumber">{m.id}</span>
                <span className="moneyListItemAmount">{m.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}
export default Quiz;


