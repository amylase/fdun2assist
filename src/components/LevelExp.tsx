import { useState } from "react"
import { Form, InputGroup } from "react-bootstrap"

function clip(value: number, min: number, max: number): number {    
    return Math.max(min, Math.min(value, max))
}

function LevelExp() {
    const [level, setLevel] = useState(1)
    const requiredExp = level ** 3
    return (<>
        <InputGroup>
            <InputGroup.Text>レベル</InputGroup.Text>
            <Form.Control type='number' value={level} onChange={(e) => setLevel(clip(Number(e.target.value), 1, 200))} />
            <InputGroup.Text>→</InputGroup.Text>
            <InputGroup.Text>経験値</InputGroup.Text>
            <Form.Control type='number' readOnly value={requiredExp} />
        </InputGroup>
    </>)
}

export default LevelExp