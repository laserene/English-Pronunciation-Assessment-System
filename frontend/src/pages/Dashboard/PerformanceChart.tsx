import { JSX } from "react";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
} from "recharts";
import "./index.css";

type Props = {
    metricsData?: any[];
    isAnimationActive?: boolean;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
        <div style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>
            <p><strong>{label}</strong></p>
            <p>WER: {(data.wer * 100).toFixed(1)}%</p>
            <p>CER: {(data.cer * 100).toFixed(1)}%</p>
            <p>Sessions: {data.session_count}</p>
        </div>
    );
};

export default function PerformanceChart({
    metricsData,
    isAnimationActive = true,
}: Props): JSX.Element {
    return (
        <LineChart
            style={{
                width: "100%",
                height: "40%",
                aspectRatio: 1.688,
                padding: "20px",
            }}
            data={metricsData}
            margin={{
                top: 0,
                right: 10,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
                type="monotone"
                dataKey="wer"
                stroke="#8884d8"
                isAnimationActive={isAnimationActive}
                name="WER"
            />
            <Line
                type="monotone"
                dataKey="cer"
                stroke="#82ca9d"
                isAnimationActive={isAnimationActive}
                name="CER"
            />
        </LineChart>
    );
}
