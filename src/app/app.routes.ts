import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes:Routes=[{path:'',component:ShellComponent,children:[
  {path:'discover',title:'События — EventHub',loadComponent:()=>import('./features/discover/discover.page').then(m=>m.DiscoverPage)},
  {path:'events/:id',title:'Событие — EventHub',loadComponent:()=>import('./features/detail/event-detail.page').then(m=>m.EventDetailPage)},
  {path:'schedule',title:'Расписание — EventHub',loadComponent:()=>import('./features/schedule/schedule.page').then(m=>m.SchedulePage)},
  {path:'tickets',title:'Билеты — EventHub',loadComponent:()=>import('./features/tickets/tickets.page').then(m=>m.TicketsPage)},
  {path:'organizer',title:'Организатор — EventHub',loadComponent:()=>import('./features/organizer/organizer.page').then(m=>m.OrganizerPage)},
  {path:'check-in',title:'Check-in — EventHub',loadComponent:()=>import('./features/check-in/check-in.page').then(m=>m.CheckInPage)},
  {path:'',pathMatch:'full',redirectTo:'discover'}
]},{path:'**',redirectTo:'discover'}];
