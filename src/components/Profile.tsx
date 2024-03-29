import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level }  = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://produtive.me/wp-content/uploads/2020/05/cropped-Produtive_N_Logo.png" alt="Winicius" />
            <div>
                <strong>Winicius Souza</strong>
                <p><img src="icons/level.svg" alt="level" />Level {level}</p>
            </div>
        </div>
    );
}