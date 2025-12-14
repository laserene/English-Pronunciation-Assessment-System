// src/models/ScriptLine.ts
export type ScriptRole = "AI" | "USER";

export interface ScriptLine {
    id: string;
    role: ScriptRole;
    content: string;
}
