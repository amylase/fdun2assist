import { useState } from 'react';

export function useStorage<T>(key: string, initialValue: T): [T, React.Dispatch<T>] {
    const [value, setValue] = useState<T>(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setStoredValue = (newValue: T) => {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };
    return [value, setStoredValue];
}