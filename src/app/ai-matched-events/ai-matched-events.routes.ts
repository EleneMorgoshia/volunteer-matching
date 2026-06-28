import { Routes } from '@angular/router';
import { AiMatchedEvents } from './ai-matched-events';

export const AI_MATCHED_EVENTS_ROUTES: Routes = [
  {
    path: 'ai-matched-events',
    title: 'AI Matched Events',
    component: AiMatchedEvents,
  },
  {
    path: 'ai-matched-events/:id',
    title: 'AI Matched Events',
    loadComponent: () => import('./ai-matched-events').then((m) => m.AiMatchedEvents),
  },
];
