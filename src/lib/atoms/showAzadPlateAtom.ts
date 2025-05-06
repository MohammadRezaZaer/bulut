// atoms/showAzadPlateAtom.ts
import { atom } from "jotai";

// Load initial state from localStorage, default to false if not present
const initialShowAzadPlate = typeof window !== "undefined" ? localStorage.getItem("showAzadPlate") === "true" : false;

// Create a Jotai atom to manage the state
export const showAzadPlateAtom = atom(initialShowAzadPlate);

// Atom to update the state and sync it with localStorage
export const setShowAzadPlateAtom = atom(
    null,
    (get, set, newValue: boolean) => {
        localStorage.setItem("showAzadPlate", newValue.toString()); // Sync to localStorage
        set(showAzadPlateAtom, newValue); // Update atom state
    }
);
