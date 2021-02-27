import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal () {

const { level, handleCloseLevelUpModal } = useContext(ChallengeContext)   

    return (
        <div className={styles.overlay}>
                    <div className={styles.container}>
                        <header>
                            {level}
                        </header>
                        <strong>
                            Parabéns
                        </strong>
                        <p>
                            Você alcançou um novo level.
                        </p>
                        <button type="button" onClick={handleCloseLevelUpModal}>
                            <img src="/icons/close.svg" alt="Fechar modal" />
                        </button>
                    </div>
        </div>
    );
}