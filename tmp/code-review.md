# Code Review: `Word.tsx` & `Words.tsx`

## `Word.tsx`

### `utterance` is recreated on every render (line 5)

```tsx
const utterance = new SpeechSynthesisUtterance(word); // BAD: new object each render
```

This should be wrapped in `useMemo` (or `useRef` since `word` is stable per instance). As-is, you're creating a new `SpeechSynthesisUtterance` on every keystroke since `inputWord` state changes cause re-renders.

### `alert()` is a blocking, inaccessible UX pattern (line 8)

`alert()` freezes the browser, is not styleable, and is generally considered bad practice in modern web apps. Replace with inline feedback — a success message in the DOM, or a callback to the parent to advance state.

### The "Check Answer" button does nothing useful (line 22)

It `console.log`s the input, which is leftover debug code. The answer checking already happens in `useEffect`. Either remove this button or wire it to a submit handler and remove the `useEffect` approach (see next point).

### `useEffect` for derived event logic is an anti-pattern here

Checking the answer on every keystroke via `useEffect` is fragile. The correct pattern is to handle this in a `onSubmit` or the button click. This also means every single character change triggers a comparison — not a major perf issue here, but conceptually wrong. Use a form submit or button click instead.

### `visibility: hidden` vs `display: none` (line 14)

`visibility: hidden` hides the element but it still occupies space in the layout. All inactive `Word` components are taking up DOM space. Use `display: none` or, better yet, conditionally render the active word only (in `Words`).

---

## `Words.tsx`

### Using `word` as `key` is fragile (line 9)

```tsx
key={word}
```

If the word list ever has duplicates, this breaks. An index-based key is actually fine here since the list is static, but a dedicated ID would be ideal.

### All words are mounted simultaneously

Since `Words` renders every `Word` (just hiding inactive ones), all `useState` and effects for every word are live at once. Given the `visibility: hidden` issue above, consider rendering only the active word:

```tsx
<Word key={words[activeIndex]} word={words[activeIndex]} ... />
```

### No completion state

When `activeIndex` exceeds `words.length - 1`, the component silently renders nothing. There's no "you finished!" feedback and no guard against the index going out of bounds.

---

## Summary

The biggest issues in priority order:

1. **Missing form/submit pattern** — replace `useEffect` answer check + dead "Check Answer" button with a real submit flow
2. **`alert()`** — replace with in-component feedback
3. **`utterance` not memoized** — wrap in `useMemo`
4. **Render all / hide with `visibility`** — render only the active word instead
