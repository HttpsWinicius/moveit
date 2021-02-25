import {createContext, useState, ReactNode} from 'react';
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

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge);
  }

  const resetChallenge = () => {
      setActiveChallenge(null);
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
        }}>
                {children}
        </ChallengeContext.Provider>
    );
}
