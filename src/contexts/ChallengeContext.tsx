import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenge.json';


interface Challenge {
    type : 'body' | 'eye';
    description : string;
    amount: number;
}

interface ChallengesContextData {
    level : number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel : number,
    activeChallenge : Challenge,
    startNewChallenge: () => void, 
    levelUp: () => void,
    completedChallenge: () => void,
    resetChallenge : () => void;
};

interface ChallengesProviderProps {
    children: ReactNode;
};


export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children} : ChallengesProviderProps ) {
    
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);


  const experienceToNextLevel = Math.pow((level + 1) * 5, 2);

    useEffect(() => {
        Notification.requestPermission();
    },[])

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge);
      new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 💥', {
                body: `Valendo ${challenge.amount} xp !!!`

            })
        }
  }

  const resetChallenge = () => {
      setActiveChallenge(null);
  }

  const completedChallenge = () => {
    if (!activeChallenge) {
        return;
    }
    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

    return (
        <ChallengeContext.Provider 
        value={{
            level, 
            currentExperience, 
            challengesCompleted, 
            activeChallenge, 
            experienceToNextLevel,
            startNewChallenge, 
            levelUp,
            resetChallenge,
            completedChallenge,
        }}>
                {children}
        </ChallengeContext.Provider>
    );
}
