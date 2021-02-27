import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookie from 'js-cookie';
import challenges from '../../challenge.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    handleCloseLevelUpModal : () => void;
};

interface ChallengesProviderProps {
    children: ReactNode;
    level : number;
    currentExperience : number;
    challengesCompleted: number;
};


export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children, ...rest} : ChallengesProviderProps ) {
    
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));
}, [level, currentExperience, challengesCompleted])

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2);

    useEffect(() => {
        Notification.requestPermission();
    },[])

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  const handleCloseLevelUpModal = () => {
      setIsLevelUpModalOpen(false);
  }

  const startNewChallenge = () => {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge);
      new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted' && screen.width > 736) {
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
            handleCloseLevelUpModal
        }}>
                {children}

        { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    );
}
