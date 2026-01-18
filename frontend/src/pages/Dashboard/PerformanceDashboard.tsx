import { JSX } from "react";
import { useEffect, useState } from "react";
import PerformanceChart from "./PerformanceChart.tsx";
import axiosInstance from "../../utils/axios";
import "./index.css";
import { useNavigate } from "react-router-dom";


export default function PerformanceDashboard(): JSX.Element {
    const [performanceData, setPerformanceData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const response = await axiosInstance.get("/performances");
                setPerformanceData(response.data.performances);
            } catch (err) {
                console.error(err);
                setPerformanceData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformanceData();
    }, []);

    if (loading) {
        return <div style={{ margin: "12px" }}>Loading performance data...</div>;
    }

    if (!performanceData || performanceData.length === 0) {
        return <div style={{ margin: "12px" }}>No performance data yet.</div>;
    }

    const averageWer =
        performanceData.reduce((sum: number, item: any) => sum + item.wer, 0) /
        performanceData.length;
    const averageCer =
        performanceData.reduce((sum: number, item: any) => sum + item.cer, 0) /
        performanceData.length;
    const totalSessions =
        performanceData.reduce((sum: number, item: any) => sum + item.session_count, 0)
    const WerTrend = performanceData[performanceData.length - 1].wer - performanceData[0].wer;
    const CerTrend = performanceData[performanceData.length - 1].cer - performanceData[0].cer;

    return (
        <div style={{ height: "100%", overflowY: "auto" }}>
            <div className="dashboard-header">
                <div className="dashboard-leave" onClick={() => {
                    navigator("/")
                }}></div>
            </div>
            <div id="performance-dashboard">
                <div className="performance-metrics-panel">
                    <div className="performance-metrics-panel-title">
                        Overall Evaluations
                    </div>
                    <div className="performance-metrics-panel-metrics">
                        <div className="performance-metrics">
                            <div className="performance-metrics-name">Avg. WER</div>
                            <div className="performance-metrics-value">
                                {averageWer.toFixed(2)}
                            </div>
                        </div>
                        <div className="performance-metrics">
                            <div className="performance-metrics-name">Avg. CER</div>
                            <div className="performance-metrics-value">
                                {averageCer.toFixed(2)}
                            </div>
                        </div>
                        <div className="performance-metrics">
                            <div className="performance-metrics-name">WER Trend</div>
                            <div className={`performance-metrics-value ${WerTrend < 0 ? "text-green" : "text-red"}`}>
                                {(WerTrend > 0 ? "+" : "")}{WerTrend.toFixed(2)}
                            </div>
                        </div>
                        <div className="performance-metrics">
                            <div className="performance-metrics-name">CER Trend</div>
                            <div className={`performance-metrics-value ${CerTrend < 0 ? "text-green" : "text-red"}`}>
                                {(CerTrend > 0 ? "+" : "")}{CerTrend.toFixed(2)}
                            </div>
                        </div>
                        <div className="performance-metrics">
                            <div className="performance-metrics-name">Total Sessions</div>
                            <div className="performance-metrics-value">
                                {totalSessions}
                            </div>
                        </div>
                    </div>
                    <PerformanceChart metricsData={performanceData} />
                </div>
            </div>
        </div>
    )
}
