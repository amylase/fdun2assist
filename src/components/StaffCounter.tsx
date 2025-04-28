import { Button, ButtonGroup, Col, Dropdown, DropdownButton, InputGroup, Row } from "react-bootstrap";
import { staffs } from "../model/item";
import { useStorage } from "../hooks/useStorage";


const staffsOrUnidentified = [
    ...staffs,
    {
        name: "未識別",
        probability: 0,
    }
]
type Staff = typeof staffsOrUnidentified[number]

type StaffState = {
    staff: Staff,
    countLowerBound: number,
    countUpperBound: number,
}

function serializeStaffCount(lowerBound: number, upperBound: number): string {
    if (lowerBound === upperBound) {
        return `${lowerBound}`
    } else {
        return `[${lowerBound}-${upperBound}]`
    }
}

type StaffCounterEntryProps = {
    state: StaffState,
    updateState: (state: StaffState) => void,
    removeStaff: () => void,
}

function StaffCounterEntry(props: StaffCounterEntryProps) {
    const { state, updateState, removeStaff } = props
    const { staff, countLowerBound, countUpperBound } = state
    const staffName = staff.name

    function handleIdentify(staff: Staff) {    
        const newState = { ...state, staff }
        updateState(newState)
    }

    function handleUse() {
        const newState = { ...state, 
            countLowerBound: Math.max(countLowerBound - 1, 0), 
            countUpperBound: Math.max(countUpperBound - 1, 0) 
        }
        updateState(newState)
    }
    function handleZero() {
        const newState = { ...state, countLowerBound: 0, countUpperBound: 0 }
        updateState(newState)
    }
    function handleAdd() {
        const newState = { ...state,
            countLowerBound: countLowerBound + 1, 
            countUpperBound: countUpperBound + 1 
        }
        updateState(newState)
    }   

    return (
        <>
            <Row>
                <Col sm={3}>
                    <InputGroup>
                        <DropdownButton variant="outline-secondary" title={staffName}>
                            {staffsOrUnidentified.map((staff) => {
                                return (
                                    <Dropdown.Item key={staff.name} onClick={() => handleIdentify(staff)}>
                                        {staff.name}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                        <InputGroup.Text>
                            {serializeStaffCount(countLowerBound, countUpperBound)}                    
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col>
                    <ButtonGroup>
                        <Button variant="primary" onClick={handleUse}>{"使用"}</Button>
                        <Button variant="secondary" onClick={handleZero}>{"0確定"}</Button>
                        <Button variant="success" onClick={handleAdd}>{"増加"}</Button>
                        <Button variant="danger" onClick={removeStaff}>{"削除"}</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </>
    )
}

function StaffCounter() {
    const [staffStates, setStaffStates] = useStorage<StaffState[]>("staffStates", [])
    function addStaff(staff: Staff) {
        const isReaper = staff.name === "死神の杖"
        const newState: StaffState = {
            staff,
            countLowerBound: isReaper ? 0 : 3,
            countUpperBound: isReaper ? 0 : 5,
        }
        setStaffStates([...staffStates, newState])
    }
    return (
        <>
            {staffStates.map((state, index) => (
                <div key={index} className="mb-2">
                    <StaffCounterEntry
                        key={index}
                        state={state}
                        updateState={(newState) => {
                            const newStaffStates = [...staffStates]
                            newStaffStates[index] = newState
                            setStaffStates(newStaffStates)
                        }}
                        removeStaff={() => {
                            const newStaffStates = staffStates.filter((_, i) => i !== index)
                            setStaffStates(newStaffStates)
                        }}
                    />
                </div>
            ))}
            <ButtonGroup>
                <DropdownButton title="杖を選択">
                    {staffsOrUnidentified.map((staff) => {
                        return (
                            <Dropdown.Item key={staff.name} onClick={() => addStaff(staff)}>
                                {staff.name}
                            </Dropdown.Item>
                        )
                    })}
                </DropdownButton>
            </ButtonGroup>
            <ButtonGroup className="ms-2">
                <Button variant="outline-secondary" onClick={() => setStaffStates([])}>リセット</Button>
            </ButtonGroup>
        </>
    )
}

export default StaffCounter;