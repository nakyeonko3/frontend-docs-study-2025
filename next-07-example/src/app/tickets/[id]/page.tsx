import TicketDetail from "@/app/tickets/[id]/TicketDetail";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface TicketDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: TicketDetailPageProps) {
  const { id } = await params;
  return {
    title: `Ticket #${id}`,
  };
}

export default function Page({ params }: TicketDetailPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>티켓을 가져오는 중 에러가 걸렸습니다</div>}>
        <TicketDetail params={params} />
      </ErrorBoundary>
    </Suspense>
  );
}
