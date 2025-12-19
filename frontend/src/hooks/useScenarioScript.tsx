import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

interface ScriptTurn {
  turn_index: number;
  speaker: "AI" | "USER";
  expected_text: string;
}

export function useScenarioScript(scenario_id: string) {
  const [script, setScript] = useState<ScriptTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scenario_id) return;

    setLoading(true);
    setError(null);

    axiosInstance.post(`/scenarios/${scenario_id}/script/`)
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
  }, [scenario_id]);

  return { script, loading, error };
}