import { useReducer } from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import { ticketsReducer } from "./ticketsReducer";

function App() {
  const [tickets, dispatch] = useReducer(ticketsReducer, []);

  return (
    <div className="container">
      <h1>Ticket Management</h1>
      <TicketForm dispatch={dispatch} />
      <TicketList tickets={tickets} dispatch={dispatch} />
    </div>
  );
}

export default App;
