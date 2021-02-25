import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import {useContext} from 'react';

export function ChallengeBox() {

const {activeChallenge, resetChallenge, completedChallenge}  = useContext(ChallengeContext);
const { resetCountDown } = useContext(CountdownContext);

const handleChallengeSucess = () => {
    completedChallenge();
    resetCountDown();
}

const handleChallengeFailed = () => {
    resetChallenge();
    resetCountDown();
}

 return(
     <div className={styles.challengeBoxContainer}>
         {activeChallenge ? (
            <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>

            <main>
                <img src={`icons/${activeChallenge.type}.svg`} alt="Tipo do desafio" />
                <strong>
                    Novo desafio
                </strong>
                <p>
                {activeChallenge.description}
                </p>
            </main>
            <footer>
                <button 
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
                >
                    Falhei
                </button>
                <button 
                type="button"
                className={styles.challengeSucessButton}
                onClick={handleChallengeSucess}
                >
                    Completei
                </button>
            </footer>
            </div>
         ) : (
            <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p/>
            <img src="icons/level-up.svg" alt="Level Up"/>
                Avance de level completando desafios.
            </div>
         )} 
     </div>
 );   
}