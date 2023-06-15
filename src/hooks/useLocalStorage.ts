import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  // État local pour stocker la valeur
  const [value, setValue] = useState(() => {
    // Récupérer la valeur depuis le Local Storage ou utiliser la valeur initiale
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Mettre à jour la valeur dans le Local Storage lorsqu'elle change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };