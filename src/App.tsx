import React, {useState, useRef, useEffect} from 'react';
// @ts-ignore
import Slider from 'react-slick'

import {Button, Card} from './Components'
import {db, getQuiz} from './Firebase/quizBase'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

type DataType = {
  [id: string]: {
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    correct: string
  }
}

function App() {
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<DataType>({})
  const slickRef: React.RefObject<Slider> = useRef()

  const slickSettings = {
    dots: false,
    arrows: false,
    speed: 500,
    infinite: false,
    draggable: false,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'custom-slick-slider opacity-0 transition-all'
  };

  function clickAnswerHandler(e: React.MouseEvent) {
    const clickedElement = e.target as HTMLElement
    const card = clickedElement.closest('.card') as HTMLElement
    const allButtons = card.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>
    const questionID = card.dataset.qId as string
    
    allButtons.forEach(btn => btn.disabled = true)

    if (quizData[questionID].correct === clickedElement.innerText) {
      setScore(prev => prev + 1)
      clickedElement.classList.add('btn__correct')
    } else {
      clickedElement.classList.add('btn__wrong')
    }

    setTimeout(() => {
      slickRef?.current.slickNext()
    }, 300)
  }

  useEffect(() => {
    getQuiz(db, 'JavaScript').then(res => setQuizData(res[0]))
    
    // Wait untill slick slider init to prevent element jumping
    setTimeout(() => {
      const main = document.querySelector('.opacity-0') as HTMLElement
      main && main.classList.replace('opacity-0', 'opacity-1')
    }, 1000) 
  }, [])
  
  return (
    <main className="bg-gradient-to-r from-green-100 via-indigo-100 to-green-100">
      <Slider ref={slickRef}  {...slickSettings}>
        {Object.keys(quizData).map((id: string) => {
            const {question, answer1, answer2, answer3, answer4} = quizData[id]
            return (
              <Card key={id} questionID={id}>
                <h2 className='font-bold text-center text-2xl mb-3'>{question}</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Button onClickHandler={(e) => clickAnswerHandler(e)} text={answer1} />
                  <Button onClickHandler={(e) => clickAnswerHandler(e)} text={answer2} />
                  <Button onClickHandler={(e) => clickAnswerHandler(e)} text={answer3} />
                  <Button onClickHandler={(e) => clickAnswerHandler(e)} text={answer4} />
                </div>
              </Card>
            )
          })
        }
        <Card>
          <h2 className='font-bold text-center text-2xl mb-3'>Your total score</h2>
          <p className='font-bold text-center text-xl'>
            <span className='text-green-500'>{score} correct answer</span><span className='color-grey-500'> from {Object.keys(quizData).length}</span>
          </p>
        </Card>
      </Slider>
    </main>
  );
}

export default App;