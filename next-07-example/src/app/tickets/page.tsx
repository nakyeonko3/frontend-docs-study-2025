import TicketForm from "@/components/TicketForm";
import TicketList from "@/components/TicketList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata = {
  title: "Ticket List",
};

export default function TicketsPage() {
  return (
    <>
      <ErrorBoundary
        fallback={<div>티켓 목록을 가져오는 중 에러가 발생했습니다</div>}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <TicketList />
        </Suspense>
        <TicketForm />
      </ErrorBoundary>
    </>
  );
}
