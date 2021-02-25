import Head from 'next/head';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import style from '../styles/pages/Home.module.css';


export default function Home() {
  return (
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
  )
}