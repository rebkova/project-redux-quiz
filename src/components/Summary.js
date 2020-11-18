import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import teacherImage from '../assets/PSX_20201118_104436.jpg'

export const Summary = () => {

  const answers = useSelector((state) => state.quiz.answers);

  const correctAnswers = answers.filter((element) => element.isCorrect)

  const Result = styled.h2`
  color: grey;
  margin: 20px;
  text-align: center;
  font-weight: light;`

  const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px
  `

  const Image = styled.img`
   max-width: 250px;
   height: auto;
  `

  return (
    <Container>
      <Image src={teacherImage} />
      <Result>You answered {correctAnswers.length} / 5 correct</Result>
    </Container>
  )
}