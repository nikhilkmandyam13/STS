import { useState } from "react";
import API from "../api/api";

function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState("");
  const [suggestedPriority, setSuggestedPriority] = useState("");


  const categories = ["TECHNICAL", "BILLING", "ACCOUNT", "GENERAL"];
  const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

  const handleClassify = async () => {
    if (!description.trim()) return;

    setLoading(true);
    try {
      const res = await API.post("tickets/classify/", {
        description: description,
      });


      if (res.data.suggested_category) {
        setCategory(res.data.suggested_category.toUpperCase());
      }

      if (res.data.suggested_priority) {
        setPriority(res.data.suggested_priority.toUpperCase());
      }
    } catch (error) {
      console.log("LLM failed, continuing normally.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required.");
      return;
    }

    setSubmitting(true);

    try {
      await API.post("tickets/", {
        title,
        description,
        category,
        priority,
        status: "OPEN",
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");

      if (onTicketCreated) {
        onTicketCreated();
      }

    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket.");
    }

    setSubmitting(false);
  };

  return (
    <div className="ticket-form">
      <h2>Submit Ticket</h2>

      <form onSubmit={handleSubmit}>
        
        {/* Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleClassify}
            required
          />
          {loading && <p>Analyzing with AI...</p>}
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            {priorities.map((pri) => (
              <option key={pri} value={pri}>
                {pri}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
