import Button from 'react-bootstrap/esm/Button'
import { IdentifiableItemName, identifiableItems, IdentificationState, gameStartState, useIdentificationStatus, IdentifiableItem } from '../contexts/IdentificationStatus';
import { ButtonGroup } from 'react-bootstrap';


function shortName(name: string) {
    // remove "の巻物" from the name
    return name
        .replace(/の巻物$/, "")
        .replace(/の腕輪$/, "")
        .replace(/の杖$/, "")
        .replace(/巻物$/, "")
}

function IdentificationStatus() {
    const [identificationStatus, setIdentificationStatus] = useIdentificationStatus();
    const handleWasurena = () => {
        const newStatusEntries = Object.entries(identificationStatus).map(([key, value]) => {
            let newValue: IdentificationState
            if (value === '識別済' || value === '忘れたかも') {
                newValue = '忘却'
            } else {
                newValue = value
            }
            return [key, newValue]
        })
        const newStatus = Object.fromEntries(newStatusEntries)
        setIdentificationStatus(newStatus)
    }
    const handleBokunenjin = () => {
        const newStatusEntries = Object.entries(identificationStatus).map(([key, value]) => {
            let newValue: IdentificationState
            if (value === '識別済') {
                newValue = '忘れたかも'
            } else {
                newValue = value
            }
            return [key, newValue]
        })
        const newStatus = Object.fromEntries(newStatusEntries)
        setIdentificationStatus(newStatus)
    }
    const updateEntry = (itemName: IdentifiableItemName, newState: IdentificationState) => {
        const newStatus = {...identificationStatus, [itemName]: newState}
        setIdentificationStatus(newStatus)
    }
    const clickHandler = (itemName: IdentifiableItemName) => {
        return (event: React.MouseEvent) => {
            const newStateMap = event.shiftKey ? {  
                // for fixup
                '未識別': '識別済',
                '識別済': '忘却',
                '忘却': '忘れたかも',
                '忘れたかも': '未識別'
            } : {  
                // most likely transitions
                '未識別': '識別済',
                '識別済': '忘却',
                '忘却': '識別済',
                '忘れたかも': '識別済'
            }
            const newState = newStateMap[identificationStatus[itemName]] as IdentificationState
            updateEntry(itemName, newState)
        }
    }
    const stateVariantMap: { [key in IdentificationState]: string } = {
        '識別済': 'success',
        '未識別': 'outline-secondary',
        '忘却': 'danger',
        '忘れたかも': 'warning'
    }
    function CategoryItems({ items }: { items: IdentifiableItem[] }) {
        return (
            <ButtonGroup size='sm' className='mb-2'>
                {items
                    .map(item => (
                        <Button 
                            key={item.name} 
                            variant={stateVariantMap[identificationStatus[item.name]]} 
                            onClick={clickHandler(item.name)}
                        >
                            {shortName(item.name)}
                        </Button>
                    ))
                }
            </ButtonGroup>
        );
    }

    function itemComparator(a: IdentifiableItem, b: IdentifiableItem) {
        return b.probability - a.probability;
    }

    return (
        <>
            <div>
                <CategoryItems items={identifiableItems.filter(item => item.category === "腕輪").sort(itemComparator)}/>
            </div>
            <div>
                <CategoryItems items={identifiableItems.filter(item => item.category === "草").sort(itemComparator)}/>
            </div>
            <div>
                <CategoryItems items={identifiableItems.filter(item => item.category === "薬").sort(itemComparator)}/>
            </div>
            <div>
                <CategoryItems items={identifiableItems.filter(item => item.category === "巻物" && item.isSelectable).sort(itemComparator)}/>
            </div>
            <div>
                <CategoryItems items={identifiableItems.filter(item => item.category === "巻物" && !item.isSelectable && item.name !== "腕輪屋の巻物" && item.name !== "変な巻物").sort(itemComparator)}/>
            </div>
            <div>
                <CategoryItems items={identifiableItems.filter(item => item.category === "杖").sort(itemComparator)}/>
            </div>
            <ButtonGroup>
                <Button variant='danger' onClick={handleWasurena}>忘れな草</Button>
                <Button variant='warning' onClick={handleBokunenjin}>墨念人の魔法</Button>
            </ButtonGroup>
            <ButtonGroup className='ms-2'>
                <Button variant='outline-secondary' onClick={() => setIdentificationStatus(gameStartState)}>リセット</Button>
            </ButtonGroup>
        </>
    );
}

export default IdentificationStatus;