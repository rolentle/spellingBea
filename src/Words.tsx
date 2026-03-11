import Word from './Word'
function Words({ words }: { readonly words: string[] }) {
    return (
        <div>
            <h2>Words</h2>
            {words.map((word) => (
                <Word key={word} word={word} />
            ))}
        </div>
    )
}

export default Words