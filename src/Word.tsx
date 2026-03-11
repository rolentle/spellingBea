import { useState, useMemo } from "react";

function Word({ word, active, setActive }: Readonly<{ word: string, active: boolean, setActive: () => void }>) {
    const [inputWord, setInputWord] = useState("");
    const utterance = useMemo(() => new SpeechSynthesisUtterance(word), [word]);
    const checkAnswer = () => {        if (inputWord.toLowerCase() === word.toLowerCase()) {
            setActive()
        }
    }

    return (
        <div style={ { display: active ? "block" : "none" } }>
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