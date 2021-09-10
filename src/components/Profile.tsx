import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level }  = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://w7.pngwing.com/pngs/87/12/png-transparent-game-controller-internet-addiction-disorder-digital-detox-eastlink-games-icon-miscellaneous-game-logo.png" alt="Winicius" />
            <div>
                <strong>Winicius Souza</strong>
                <p><img src="icons/level.svg" alt="level" />Level {level}</p>
            </div>
        </div>
    );
}