import Container from 'react-bootstrap/Container'
import { items } from '../model/item'
import Button from 'react-bootstrap/esm/Button'
import { useIdentificationStatus, Status as IdentificationStatus } from '../contexts/IdentificationStatus'
import { useStorage } from '../hooks/useStorage'

const selectableItems = items.filter(item => item.category === '巻物' && item.isSelectable)
type SelectableItemName = typeof selectableItems[number]['name']
type Status = number[]
const initialState: Status = [0]

function permutations<T>(items: T[]): T[][] {
    // enumerates all permutations of the given items
    // python's itertools.permutations(items, len(items))

    const perms = []
    if (items.length === 0) return [[]]

    for (let item of items) {
        const newItems = items.filter(i => i !== item)
        const subPerms = permutations(newItems)
        for (let subPerm of subPerms) {
            perms.push([item, ...subPerm])
        }
    }
    return perms
}

type ProbabilityMap = Partial<Record<SelectableItemName, number>>
function calculateProbability(observations: number[], identificationStatus: IdentificationStatus): ProbabilityMap[] | null {
    const unidentifiedSelectableScrolls = items
        .filter(item => item.category === '巻物')
        .filter(item => item.isSelectable)
        .filter(item => identificationStatus[item.name] !== '識別済')
    const weights = Object.fromEntries(unidentifiedSelectableScrolls.map(item => [item.name, item.probability]))

    const observationsFilled = [...observations]
    while (observationsFilled.length < unidentifiedSelectableScrolls.length) {
        observationsFilled.push(0)
    }
    
    if (observationsFilled.length !== unidentifiedSelectableScrolls.length) {
        console.error("Observation length does not match unidentified scrolls length")
        return null
    }

    const unidentified = unidentifiedSelectableScrolls.map(item => item.name)

    const total_weight = Object.values(weights).reduce((a, b) => a + b, 0)

    const assign_weights = []
    for (let assignments of permutations(unidentified)) {
        let assign_weight = 1.
        for (let i = 0; i < assignments.length; i++) {
            const item_name = assignments[i]
            assign_weight *= (weights[item_name] / total_weight) ** observationsFilled[i]
        }
        assign_weights.push({
            assignments,
            weight: assign_weight,
        })
    }

    const total_assign_weight = assign_weights.reduce((a, b) => a + b.weight, 0)
    for (let assign_weight of assign_weights) {
        assign_weight.weight /= total_assign_weight
    }

    const probabilities = []
    for (let i = 0; i < observations.length; i++) {
        const probas: ProbabilityMap = {}
        for (const assign_weight of assign_weights) {
            const { assignments, weight } = assign_weight
            probas[assignments[i]] = (probas[assignments[i]] || 0) + weight
        }
        probabilities.push(probas)
    }
    return probabilities
}

function UnidentifiedScroll(props: {
    count: number,
    probabilities: ProbabilityMap,
    setCount: (count: number) => void,
    deleteEntry: () => void,
}) {
    return (
        <Container>
            
            <input type='number' value={props.count} onChange={(e) => props.setCount(Number(e.target.value))} />
            {Object.entries(props.probabilities).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
            ))}
            <Button variant="danger" onClick={props.deleteEntry}>Delete</Button>
        </Container>
    )
} 

function ScrollIdentifier() {
    const [identificationStatus, _] = useIdentificationStatus();
    const [itemCounts, setItemCounts] = useStorage("itemCounts", initialState);
    const handleReset = () => setItemCounts(initialState)
    const updateEntry = (index: number, newCount: number) => {
        if (newCount < 0) return;
        if (newCount > 25) return;
        const newState = [...itemCounts];
        newState[index] = newCount;
        setItemCounts(newState);
    }
    const deleteEntry = (index: number) => {
        const newState = [...itemCounts];
        newState.splice(index, 1);
        setItemCounts(newState);
    }
    const probabilities = calculateProbability(itemCounts, identificationStatus);
    
    return (
        <Container>
            <h1>指定巻物事後確率</h1>
            <Button onClick={handleReset}>リセット</Button>
            <Button onClick={() => {if (itemCounts.length < 6) setItemCounts([...itemCounts, 0])}}>追加</Button>
            <Container>
                {itemCounts.map((count, index) => (
                    <UnidentifiedScroll
                        key={index}
                        count={count}
                        probabilities={probabilities ? probabilities[index] : {}}
                        setCount={(count) => updateEntry(index, count)}
                        deleteEntry={() => deleteEntry(index)}
                    />
                ))}
            </Container>
        </Container>
    );
}

export default ScrollIdentifier;