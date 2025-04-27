import { Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { staffs } from "../model/item";
import { useStorage } from "../hooks/useStorage";


type Staff = typeof staffs[number]

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
        <Container>
            <span>{`${staffName} ${serializeStaffCount(countLowerBound, countUpperBound)}`}</span>
            <Button onClick={handleUse}>{"使"}</Button>
            <Button onClick={handleZero}>{"0"}</Button>
            <Button onClick={handleAdd}>{"増"}</Button>
            <Button onClick={removeStaff}>{"消"}</Button>
        </Container>
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
        <Container>
            <h1>杖カウンター</h1>
            <DropdownButton id="dropdown-basic-button" title="杖を選択">
                {staffs.map((staff) => {
                    return (
                        <Dropdown.Item key={staff.name} onClick={() => addStaff(staff)}>
                            {staff.name}
                        </Dropdown.Item>
                    )
                })}
            </DropdownButton>
            {staffStates.map((state, index) => (
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
            ))}
        </Container>
    )
}

export default StaffCounter;