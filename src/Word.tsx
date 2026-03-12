import { useState, useMemo, useEffect } from "react";
import './Word.css'

function Word({ word, active, setActive }: Readonly<{ word: string, active: boolean, setActive: () => void }>) {
    const [correct, setCorrect] = useState(false);
    const [inputWord, setInputWord] = useState("");
    const utterance = useMemo(() => new SpeechSynthesisUtterance(word), [word]);
    useEffect(() => {
        if (active) {
            speechSynthesis.speak(utterance);
        }
    }, [active, utterance]);

    const checkAnswer = () => {
        if (inputWord.toLowerCase() === word.toLowerCase()) {
            setCorrect(true);
            setActive();
        }
    }

    return (
        <>
        { !correct && <div className="card" style={ { display: active && !correct ? "block" : "none" } }>
            <button onClick={() => speechSynthesis.speak(utterance)}>Speak</button>
            <input
                type="text"
                placeholder="Type the word here"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
            />
            <button onClick={checkAnswer}>Check Answer</button>
        </div>
        }
        { correct && <h3>{word} is correct!</h3>}
        </>
    )
}

export default Word;