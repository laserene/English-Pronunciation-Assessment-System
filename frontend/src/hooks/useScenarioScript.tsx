import { useState, useEffect } from "react";
import axios from "axios";

interface ScriptTurn {
  turn_index: number;
  speaker: "AI" | "USER";
  expected_text: string;
}

export function useScenarioScript(scenarioId: string) {
  const [script, setScript] = useState<ScriptTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scenarioId) return;

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:8000/scenarios/${scenarioId}/script/`)
      .then((res) => {
        setScript(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.detail || err.message || "Failed to fetch script"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [scenarioId]);

  return { script, loading, error };
}