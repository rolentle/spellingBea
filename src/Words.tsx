import { useState } from 'react';
import Word from './Word'
function Words({ words }: Readonly<{ words: string[] }>) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div>
            <h2>Words</h2>
            {words.map((word, index) => (
                <Word key={word} active={index === activeIndex} setActive={() => setActiveIndex(index+1)} word={word} />
            ))}
        </div>
    )
}

export default Words