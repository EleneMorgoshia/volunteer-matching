import { Routes } from '@angular/router';

export const AI_MATCHED_EVENTS_ROUTES: Routes = [
  {
    path: 'ai-matched-events',
    title: 'AI Matched Events',
    loadComponent: () =>
      import('./ai-matched-events').then(
        (m) => m.AiMatchedEvents,
      ),
  },
];