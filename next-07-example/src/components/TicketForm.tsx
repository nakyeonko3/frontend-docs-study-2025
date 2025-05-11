import { createNewTicket } from "@/services/ticketService";
import { revalidatePath } from "next/cache";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import TextField from "./TextField";

export default function TicketForm() {
  const handleSubmitTicket = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    await createNewTicket({ title, description });
    revalidatePath("/tickets");
  };

  return (
    <form className="add-ticket-form" action={handleSubmitTicket}>
      <TextField label="Title" name="title" placeholder="Title" />
      <TextArea
        label="Description"
        name="description"
        placeholder="Description"
      />
      <SubmitButton label="Add Ticket" />
    </form>
  );
}
