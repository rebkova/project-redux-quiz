import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "reducers/quiz";
import styled from 'styled-components';

export const Summary = () => {

  const answers = useSelector((state) => state.quiz.answers);

  const correctAnswers = answers.filter(element => element.isCorrect)
  console.log(correctAnswers)
  
  return (
    <div>
      <p>You answered {correctAnswers.length} / 5 correct</p>
    </div>
  )
}