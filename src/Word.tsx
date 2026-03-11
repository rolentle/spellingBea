import { useEffect, useState } from "react"

function Word({ word }: Readonly<{ word: string }>) {
    const [inputWord, setInputWord] = useState("");
    const utterance = new SpeechSynthesisUtterance(word);
    useEffect(() => {
        if (inputWord.toLowerCase() === word.toLowerCase()) {
            alert("Correct!")
        }
    }, [inputWord, word])


    return (
        <div>
            <button onClick={() => speechSynthesis.speak(utterance)}>Speak</button>
            <input
                type="text"
                placeholder="Type the word here"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
            />
            <button onClick={() => console.log(inputWord)}>Check Answer</button>

        </div>
    )
}

export default Word