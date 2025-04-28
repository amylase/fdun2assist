import React, { createContext } from 'react';
import { items } from "../model/item";
import { useStorage } from '../hooks/useStorage';

export const identifiableItems = items.filter(item => item.isIdentifiable)
export type IdentifiableItem = typeof identifiableItems[number]
export type IdentifiableItemName = typeof identifiableItems[number]['name']
export type IdentificationState = '識別済' | '未識別' | '忘却' | '忘れたかも'

export type Status = {
  [key in IdentifiableItemName]: IdentificationState
}
export const gameStartState = Object.fromEntries(identifiableItems.map(item => {
  return [item.name, '未識別']
})) as Status

const IdentificationStatusContext = createContext<ContextType | null>(null);
type ContextType = [Status, React.Dispatch<Status>]

export function IdentificationStatusProvider({ children }: { children: React.ReactNode }) {
    const [identificationStatus, setIdentificationStatus] = useStorage<Status>("identificationStatus", gameStartState);
    
    return (
        <IdentificationStatusContext value={[identificationStatus, setIdentificationStatus]} >
            {children}
        </IdentificationStatusContext>
    );
}

export function useIdentificationStatus(): ContextType {
    const context = React.useContext(IdentificationStatusContext);
    if (context === null) {
        throw new Error("useIdentificationStatus must be used within a IdentificationStatusProvider");
    }
    return context;
}
