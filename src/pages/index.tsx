import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import style from '../styles/pages/Home.module.css';
import { createContext } from 'react';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level : number, 
  currentExperience : number,
  challengesCompleted: number
};

export default function Home(props) {
  return (
    <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience} 
    challengesCompleted= {props.challengesCompleted} 
    >
    <div className={style.container}>
      <Head>
        <title>N Move.it</title>
      </Head>
      <ExperienceBar />
    <CountdownProvider>
    <section>
    <div>
      <Profile />
      <CompletedChallenges />
      <Countdown />
    </div>
    <div>
    <ChallengeBox />
    </div>
  </section>
  </CountdownProvider>
  </div>
  </ChallengesProvider>
  )
}



export const getServerSideProps : GetServerSideProps = async (ctx) => {


  const {level , currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted) 
    }
  }
}