import { useEffect, useState } from "react";
import API from "../api/api";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");

  const categories = ["TECHNICAL", "BILLING", "ACCOUNT", "GENERAL"];
  const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const statuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];

  // 🔹 Fetch Tickets
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `tickets/?category=${selectedCategory}&priority=${selectedPriority}&status=${selectedStatus}&search=${search}&ordering=-created_at`
      );
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, [selectedCategory, selectedPriority, selectedStatus, search]);

  // 🔹 Update Status
  const updateStatus = async (id, newStatus) => {
    try {
      await API.patch(`tickets/${id}/`, {
        status: newStatus,
      });

      fetchTickets();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>

      {/* 🔹 Filters */}
      <div style={{ marginBottom: "20px" }}>
        
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="">All Priorities</option>
          {priorities.map((pri) => (
            <option key={pri} value={pri}>
              {pri}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading tickets...</p>}

      {/* 🔹 Ticket Cards */}
      {tickets.length === 0 && !loading && <p>No tickets found.</p>}

      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{ticket.title}</h3>

          <p>
            {ticket.description.length > 100
              ? ticket.description.slice(0, 100) + "..."
              : ticket.description}
          </p>

          <p>
            <strong>Category:</strong> {ticket.category}
          </p>

          <p>
            <strong>Priority:</strong> {ticket.priority}
          </p>

          <p>
            <strong>Status:</strong> {ticket.status}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(ticket.created_at).toLocaleString()}
          </p>

          {/* 🔹 Status Update Dropdown */}
          <select
            value={ticket.status}
            onChange={(e) => updateStatus(ticket.id, e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default TicketList;
