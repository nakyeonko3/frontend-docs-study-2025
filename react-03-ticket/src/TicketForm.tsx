import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import TextField from "./TextField";
import { Dispatch } from "./ticketsReducer";

interface TicketFormProps {
  dispatch: Dispatch;
}

export default function TicketForm({ dispatch }: TicketFormProps) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("ticket-title") as string;
    const description = formData.get("ticket-description") as string;
    dispatch({ type: "addTicket", title, description });
    form.reset();
  };

  return (
    <form className="ticket-form" onSubmit={onSubmit}>
      <TextField label="Title" name="ticket-title" placeholder="Title" />
      <TextArea
        label="Description"
        name="ticket-description"
        placeholder="Description"
      />
      <SubmitButton label="Add Ticket" />
    </form>
  );
}
