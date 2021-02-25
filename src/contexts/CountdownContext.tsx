import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengeContext } from "./ChallengeContext";

//Dizendo pro typescript o formato de cada um dos dados
interface CountdownContextData {
    minutes : number,
    seconds : number,
    hasFinished : boolean,
    isActive : boolean,
    startCountDown: () => void,
    resetCountDown : () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
};


export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider({children} : CountdownProviderProps) {



    const { startNewChallenge }  = useContext(ChallengeContext);
    
    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    
    const startCountDown = () => setIsActive(true);

    const resetCountDown = () => {
    setIsActive(false); 
    clearTimeout(countdownTimeout);
    setHasFinished(false);
    setTime(0.05*60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge();
        }
    }, [isActive, time])

    //O que eu quero retornar vai dentro de value
return (
    <CountdownContext.Provider 
    value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown,

    }}>
        {children}
    </CountdownContext.Provider>
);

}
