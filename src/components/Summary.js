import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "reducers/quiz";
import styled from 'styled-components';

export const Summary = () => {

  const dispatch = useDispatch();

  const answers = useSelector((state) => state.quiz.answers);

  const correctAnswers = answers.filter(element => element.isCorrect)
  console.log(correctAnswers)

  const Result = styled.h2`
  color: grey;
  margin: 20px;
  text-align: center;
  font-weight: light;`
  
  return (
    <div>
      <Result>You answered {correctAnswers.length} / 5 correct</Result>
    </div>
  )
}