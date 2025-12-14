// src/services/scenario.service.ts
import { ScriptLine } from "../models/script_line.ts";

export async function fetchScenarioScript(
    topic: string,
    vocabulary: string[]
): Promise<ScriptLine[]> {
    const res = await fetch("http://localhost:8080/scenario/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, vocabulary })
    });

    if (!res.ok) {
        throw new Error("Failed to load scenario script");
    }

    return res.json();
}
