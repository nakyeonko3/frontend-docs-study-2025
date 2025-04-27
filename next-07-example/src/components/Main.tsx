import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import TicketForm from './TicketForm';
import TicketList from './TicketList';

export default function Main() {
  return (
    <main>
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
      <TicketForm />
    </main>
  );
}
