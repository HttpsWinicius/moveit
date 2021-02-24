import styles from '../styles/components/Profile.module.css'
export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/WiniciusNvoip.png" alt="Marco Antonio" />
            <div>
                <strong>Winicius Souza</strong>
                <p><img src="icons/level.svg" alt="" />Level 1</p>
            </div>
        </div>
    );
}