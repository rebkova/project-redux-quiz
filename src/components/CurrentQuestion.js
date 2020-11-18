import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "reducers/quiz";
import styled from 'styled-components';
import "@lottiefiles/lottie-player";

import { Summary } from "components/Summary";

export const CurrentQuestion = () => {

  // set state & initial state
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const quizOver = useSelector(
    (state) => state.quiz.quizOver
  );

  // fetching the whole array of answers
  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );
  
  const [showSummary, setShowSummary] = useState(false)
  const [hideQuestion, setHideQuestion] = useState(false)
  
  // "activate" dispatch hook
  const dispatch = useDispatch()

  // function that takes the answerIndex and dispatches the whole object 
  // with question id and answer index to reducer (quiz)
  const handleAnswerButton = (index) => {
    dispatch(quiz.actions.submitAnswer({questionId: question.id, answerIndex: index}))
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const Button = styled.button`
    box-shadow: 0px 1px 0px 0px #97c4fe;
    background: linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
    background-color: #3d94f6;
    border-radius: 6px;
    border: 1px solid #337fed;
    cursor: pointer;
    color: #ffffff;
    font-family: 'Space Mono', monospace;
    font-size: 27px;
    font-weight: bold;
    padding:25px 76px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #3d768a;
    margin: 20px;
    
    &:hover {
    background: linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
    background-color: #1e62d0; 
    }
      
    &:active {
    position:relative;
    top:1px; 
    }`

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px
    `
  const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 50px
    `
  const Title = styled.h1`
    color: #222226;
    margin: 20px;
    text-align: center;`

  const Progress = styled.h2`
    color: grey;
    margin: 20px;
    text-align: center;
    font-weight: light;`

  return (
    <Container>
      {!hideQuestion &&
        <><Title>Question: {question.questionText}</Title>
          <lottie-player
            autoplay
            loop
            mode="normal"
            src={question.lottie}
            style={{ height: 400 }}
          />

          {!answer && // display all options if none has been answered
          <ButtonContainer>
            {question.options.map((answerOption, index) => {
              return <Button type="button" key={index} onClick={() => handleAnswerButton(index)}>{answerOption}</Button>;
            })}
          </ButtonContainer>}
          {answer && (answer.answerIndex === answer.question.correctAnswerIndex ? <lottie-player
            autoplay
            loop
            mode="normal"
            src={'https://assets2.lottiefiles.com/packages/lf20_9eH8kJ.json'}
            style={{ height: 100 }}
          /> : <lottie-player
            autoplay
            loop
            mode="normal"
            src={'https://assets9.lottiefiles.com/packages/lf20_gO48yV.json'}
            style={{ height: 100 }}
          />)}
          {(answer && !quizOver) && <Button type="button" onClick={() => dispatch(quiz.actions.goToNextQuestion())}>Next question</Button>}
          <Progress>You are on question {question.id} of 5.</Progress>    
          {quizOver && 
          <Button
            type="button" 
            onClick={() => {
              setShowSummary(true)
              setHideQuestion(true)
            }}>Show your result
          </Button>}
        </>}
      {showSummary && <Summary />}
      {showSummary &&
        <Button
          type="button"
          onClick={() => {
            dispatch(quiz.actions.restart())
            setShowSummary(false)
            setHideQuestion(false)
          }}>
        Restart quiz!
        </Button>}
    </Container>
  )
}