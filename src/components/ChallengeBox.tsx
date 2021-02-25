import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengeContext } from '../contexts/ChallengeContext';
import {useContext} from 'react';

export function ChallengeBox() {

const {activeChallenge, resetChallenge}  = useContext(ChallengeContext);

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
                onClick={resetChallenge}
                >
                    Falhei
                </button>
                <button 
                type="button"
                className={styles.challengeSucessButton}
                >
                    Completei
                </button>
            </footer>
            </div>
         ) : (
            <div className={styles.challengeNotActive}>
            <strong>Finalize um cilco para receber um desafio</strong>
            <p/>
            <img src="icons/level-up.svg" alt="Level Up"/>
                Avance de level completando desafios.
            </div>
         )} 
     </div>
 );   
}