import { useState, useMemo, useEffect } from "react";
import './Word.css'

function Word({ word, active, setActive }: Readonly<{ word: string, active: boolean, setActive: () => void }>) {
    const [inputWord, setInputWord] = useState("");
    const utterance = useMemo(() => new SpeechSynthesisUtterance(word), [word]);
    useEffect(() => {
        if (active) {
            speechSynthesis.speak(utterance);
        }
    }, [active, utterance]);

    const checkAnswer = () => {        if (inputWord.toLowerCase() === word.toLowerCase()) {
            setActive()
        }
    }

    return (
        <div className="card" style={ { display: active ? "block" : "none" } }>
            <button onClick={() => speechSynthesis.speak(utterance)}>Speak</button>
            <input
                type="text"
                placeholder="Type the word here"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
            />
            <button onClick={checkAnswer}>Check Answer</button>

        </div>
    )
}

export default Word;