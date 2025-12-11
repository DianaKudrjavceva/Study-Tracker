import { useEffect, useState, useRef } from "react";
import api from "../api/axiosClient";
import Chart from "chart.js/auto";

export default function DashboardPage() {
    const [modules, setModules] = useState([]);
    const [sessions, setSessions] = useState([]);

    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartInstance = useRef(null);
    const pieChartInstance = useRef(null);

    useEffect(() => {
        loadModules();
        loadSessions();
    }, []);

    const loadModules = async () => {
        const res = await api.get("/modules");
        setModules(res.data);
    };

    const loadSessions = async () => {
        const res = await api.get("/study-sessions");
        setSessions(res.data);
    };

    const totalStudyMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

    const completedModules = modules.filter((m) => m.status === "Completed").length;
    const inProgressModules = modules.filter((m) => m.status === "In Progress").length;

    const taskTotals = modules.reduce(
        (acc, mod) => {
            if (mod.tasks && mod.tasks.length > 0) {
                const completed = mod.tasks.filter((t) => t.completed).length;
                acc.completed += completed;
                acc.total += mod.tasks.length;
            }
            return acc;
        },
        { completed: 0, total: 0 }
    );

    const moduleMinutes = {};
    modules.forEach((mod) => {
        moduleMinutes[mod._id] = sessions
            .filter((s) => s.moduleId === mod._id)
            .reduce((sum, s) => sum + s.duration, 0);
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyTotals = Array(7).fill(0);
    sessions.forEach((s) => {
        const day = new Date(s.date).getDay();
        weeklyTotals[day] += s.duration;
    });

    useEffect(() => {
        if (!barChartRef.current) return;

        if (barChartInstance.current) barChartInstance.current.destroy();

        barChartInstance.current = new Chart(barChartRef.current, {
            type: "bar",
            data: {
                labels: days,
                datasets: [
                    {
                        label: "Minutes Studied",
                        data: weeklyTotals,
                        backgroundColor: "#2ab3c0",
                    },
                ],
            },
            options: { responsive: true, plugins: { legend: { display: false } } },
        });
    }, [sessions]);

    useEffect(() => {
        if (!pieChartRef.current) return;

        if (pieChartInstance.current) pieChartInstance.current.destroy();

        pieChartInstance.current = new Chart(pieChartRef.current, {
            type: "pie",
            data: {
                labels: modules.map((m) => m.title),
                datasets: [
                    {
                        data: modules.map((m) => moduleMinutes[m._id] || 0),
                        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
                    },
                ],
            },
            options: { responsive: true },
        });
    }, [modules, sessions]);

    const getProgressColor = (progress) => {
        if (progress === 100) return "#4caf50";
        if (progress >= 70) return "#8bc34a";
        if (progress >= 40) return "#ffb300";
        return "#e53935";
    };

    return (
        <div className="page-section">
            <h2 className="section-title">Dashboard</h2>

            <div className="details-box">
                <p><strong>Total Study Time:</strong> {totalStudyHours} hours ({totalStudyMinutes} minutes)</p>
                <p><strong>Modules Completed:</strong> {completedModules}</p>
                <p><strong>Modules In Progress:</strong> {inProgressModules}</p>
                <p><strong>Tasks Completed:</strong> {taskTotals.completed}/{taskTotals.total}</p>
            </div>

            <div className="dashboard-row">
                <div className="dash-card">
                    <h3>Weekly Study Time</h3>
                    <canvas ref={barChartRef}></canvas>
                </div>

                <div className="dash-card">
                    <h3>Study Time Per Module (min)</h3>
                    <canvas ref={pieChartRef}></canvas>
                </div>
            </div>

            <div className="dash-card full-width">
                <h3>Module Progress</h3>
                <ul class="progress-list">
                    {modules.map((m) => (
                        <li key={m._id} style={{ marginBottom: "0.7rem" }}>
                            {m.title}
                            <div
                                style={{
                                    height: "12px",
                                    width: "100%",
                                    background: "#ddd",
                                    borderRadius: "6px",
                                    marginTop: "4px",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${m.progress}%`,
                                        height: "100%",
                                        background: getProgressColor(m.progress),
                                        borderRadius: "6px",
                                    }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );

}
