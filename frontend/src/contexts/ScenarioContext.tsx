import { createContext, useContext, ReactNode } from "react";

interface ScenarioContextType {
    scenario_id: number | undefined;
    currentTurn: number;
    setCurrentTurn: (turn: number) => void;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

// Custom hook to use the scenario context
export function useScenario() {
    const context = useContext(ScenarioContext);
    if (!context) {
        throw new Error("useScenario must be used within ScenarioProvider");
    }
    return context;
}

// Provider component props
interface ScenarioProviderProps {
    children: ReactNode;
    scenario_id: number | undefined;
    currentTurn: number;
    setCurrentTurn: (turn: number) => void;
}

// Provider component
export function ScenarioProvider({
    children,
    scenario_id,
    currentTurn,
    setCurrentTurn,
}: ScenarioProviderProps) {
    const value = {
        scenario_id,
        currentTurn,
        setCurrentTurn,
    };

    return (
        <ScenarioContext.Provider value={value}>
            {children}
        </ScenarioContext.Provider>
    );
}