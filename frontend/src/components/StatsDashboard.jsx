import { useEffect, useState } from "react";
import API from "../api/api";

function StatsDashboard({ refreshTrigger }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await API.get("tickets/stats/");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]); // 🔥 auto refresh when trigger changes

  if (loading) return <p>Loading stats...</p>;
  if (!stats) return null;

  return (
    <div style={{ marginTop: "30px", border: "2px solid #ddd", padding: "20px" }}>
      <h2>📊 Ticket Statistics</h2>

      <p><strong>Total Tickets:</strong> {stats.total_tickets}</p>
      <p><strong>Open Tickets:</strong> {stats.open_tickets}</p>
      <p><strong>Average Per Day:</strong> {stats.avg_tickets_per_day}</p>

      <hr />

      <h3>Priority Breakdown</h3>
      <ul>
        {Object.entries(stats.priority_breakdown).map(([key, value]) => (
          <li key={key}>
            {key.toUpperCase()}: {value}
          </li>
        ))}
      </ul>

      <h3>Category Breakdown</h3>
      <ul>
        {Object.entries(stats.category_breakdown).map(([key, value]) => (
          <li key={key}>
            {key.toUpperCase()}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatsDashboard;
