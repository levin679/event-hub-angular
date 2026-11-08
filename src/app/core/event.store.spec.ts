import { TestBed } from '@angular/core/testing';
import { EventStore } from './event.store';

describe('EventStore',()=>{
  beforeEach(()=>{localStorage.clear();TestBed.configureTestingModule({});});
  it('toggles an event in the personal schedule',()=>{const store=TestBed.inject(EventStore);const id=store.events()[0].id;const before=store.isScheduled(id);store.toggleSchedule(id);expect(store.isScheduled(id)).toBe(!before);});
  it('registers and checks in a ticket',()=>{const store=TestBed.inject(EventStore);const event=store.events()[0];const ticket=store.register({eventId:event.id,attendeeName:'Тестовый Пользователь',email:'test@example.dev',ticketType:'standard',price:event.price});expect(store.registrations().some(item=>item.id===ticket.id)).toBe(true);expect(store.checkIn(ticket.id)?.checkedIn).toBe(true);});
});
