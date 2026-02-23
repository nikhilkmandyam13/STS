import { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatsDashboard from "./components/StatsDashboard";

function App() {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support Ticket System</h1>

      <TicketForm onTicketCreated={triggerRefresh} />

      <StatsDashboard refreshTrigger={refresh} />

      <TicketList refreshTrigger={refresh} />
    </div>
  );
}

export default App;
