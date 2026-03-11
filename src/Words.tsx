import { useState } from 'react';
import Word from './Word'
function Words({ words }: Readonly<{ words: string[] }>) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const setActiveIndexSafe = (index: number) => {
        if (index < words.length) {
            setActiveIndex(index);
        } else {
            setFinished(true);
        }
    }
    return (
        <div>
            <h2>Words</h2>
            {words.map((word, index) => (
                <Word key={index} active={index === activeIndex} setActive={() => setActiveIndexSafe(index+1)} word={word} />
            ))}
            {finished && <h3>Congratulations! You've completed the spelling bea!</h3>}
        </div>
    )
}

export default Words