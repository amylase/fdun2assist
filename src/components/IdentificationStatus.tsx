import { Category } from '../model/item'
import Button from 'react-bootstrap/esm/Button'
import { IdentifiableItemName, identifiableItems, IdentificationState, gameStartState, useIdentificationStatus } from '../contexts/IdentificationStatus';
import { ButtonGroup } from 'react-bootstrap';


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
    function CategoryItems({ category }: { category: Category }) {
        return (
            <ButtonGroup size='sm' className='mb-2'>
                {identifiableItems
                    .filter(item => item.category === category)
                    .map(item => (
                        <Button 
                            key={item.name} 
                            variant={stateVariantMap[identificationStatus[item.name]]} 
                            onClick={clickHandler(item.name)}
                        >
                            {item.name}
                        </Button>
                    ))
                }
            </ButtonGroup>
        );
    }

    return (
        <>
            <CategoryItems category="腕輪" />
            <CategoryItems category="草" />
            <CategoryItems category="薬" />
            <CategoryItems category="巻物" />
            <CategoryItems category="杖" />
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