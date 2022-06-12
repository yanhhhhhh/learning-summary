import { useRecoilState, useRecoilValue } from "recoil"
import { textState, chartCountState } from "../store"

export default function CharacterCounter() {
    return (
        <>
            <TextInput />
            <CharacterCount />
        </>
    )
}
function TextInput() {
    const [text, setText] = useRecoilState(textState)
    const onChange = (e) => {
        setText(e.target.value)
    }
    return (
        <>
            <input type="text" value={text} onChange={onChange}></input>

            <br />
            input:{text}
        </>

    )
}
function CharacterCount() {
    const count = useRecoilValue(chartCountState)
    return (
        <div>
            count:{count}
        </div>
    )

}