import { createContext, useContext } from "react";

export type ScenarioData = {
    topic: string;
    vocabulary: string[];
};

export const ScenarioContext = createContext<ScenarioData | null>(null);

export const useConversation = () => {
    const context = useContext(ScenarioContext);
    if (!context) {
        throw new Error("useConversation must be used within ScenarioProvider");
    }
    return context;
};
