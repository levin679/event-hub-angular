import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { EVENT_SEED } from './event.seed';
import { EventFilters, EventHubSnapshot, EventItem, Registration } from './event.models';

const STORAGE_KEY = 'event-hub-v1';
function seed(): EventHubSnapshot { return structuredClone(EVENT_SEED); }

@Injectable({ providedIn: 'root' })
export class EventStore {
  private readonly storage = inject(BrowserStorageService);
  private readonly snapshot = signal<EventHubSnapshot>(this.storage.read(STORAGE_KEY, seed()));
  readonly filters = signal<EventFilters>({ query: '', category: 'all', format: 'all' });
  readonly events = computed(() => this.snapshot().events);
  readonly registrations = computed(() => this.snapshot().registrations);
  readonly favorites = computed(() => this.snapshot().favorites);
  readonly schedule = computed(() => this.snapshot().schedule);
  readonly featured = computed(() => this.events().filter((item) => item.featured));
  readonly visibleEvents = computed(() => {
    const filters = this.filters();
    const query = filters.query.trim().toLocaleLowerCase('ru');
    return this.events().filter((item) => {
      const queryMatch = !query || [item.title, item.subtitle, item.city, ...item.tags].join(' ').toLocaleLowerCase('ru').includes(query);
      const categoryMatch = filters.category === 'all' || item.category === filters.category;
      const formatMatch = filters.format === 'all' || item.format === filters.format;
      return queryMatch && categoryMatch && formatMatch;
    }).sort((a, b) => a.date.localeCompare(b.date));
  });
  readonly scheduledEvents = computed(() => this.schedule().map((id) => this.events().find((item) => item.id === id)).filter((item): item is EventItem => Boolean(item)).sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)));
  readonly totalAttendees = computed(() => this.events().reduce((sum, item) => sum + item.registered, 0));
  readonly totalCapacity = computed(() => this.events().reduce((sum, item) => sum + item.capacity, 0));
  readonly estimatedRevenue = computed(() => this.events().reduce((sum, item) => sum + item.registered * item.price, 0));

  constructor() { effect(() => this.storage.write(STORAGE_KEY, this.snapshot())); }

  eventById(id: string): EventItem | undefined { return this.events().find((item) => item.id === id); }
  isFavorite(id: string): boolean { return this.favorites().includes(id); }
  isScheduled(id: string): boolean { return this.schedule().includes(id); }
  occupancy(item: EventItem): number { return Math.round((item.registered / item.capacity) * 100); }

  toggleFavorite(id: string): void {
    this.snapshot.update((state) => ({ ...state, favorites: state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id] }));
  }
  toggleSchedule(id: string): void {
    this.snapshot.update((state) => ({ ...state, schedule: state.schedule.includes(id) ? state.schedule.filter((item) => item !== id) : [...state.schedule, id] }));
  }
  register(input: Omit<Registration, 'id' | 'createdAt' | 'checkedIn'>): Registration {
    const registration: Registration = { ...input, id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date().toISOString(), checkedIn: false };
    this.snapshot.update((state) => ({
      ...state,
      registrations: [registration, ...state.registrations],
      events: state.events.map((item) => item.id === input.eventId ? { ...item, registered: Math.min(item.capacity, item.registered + 1) } : item)
    }));
    return registration;
  }
  createEvent(input: Omit<EventItem, 'id' | 'registered' | 'featured' | 'speakers'>): void {
    const item: EventItem = { ...input, id: `ev-${Date.now()}`, registered: 0, featured: false, speakers: [] };
    this.snapshot.update((state) => ({ ...state, events: [...state.events, item] }));
  }
  checkIn(ticketId: string): Registration | undefined {
    const ticket = this.registrations().find((item) => item.id.toLocaleUpperCase() === ticketId.trim().toLocaleUpperCase());
    if (!ticket || ticket.checkedIn) return ticket;
    this.snapshot.update((state) => ({ ...state, registrations: state.registrations.map((item) => item.id === ticket.id ? { ...item, checkedIn: true } : item) }));
    return { ...ticket, checkedIn: true };
  }
  setQuery(query: string): void { this.filters.update((value) => ({ ...value, query })); }
  setCategory(category: EventFilters['category']): void { this.filters.update((value) => ({ ...value, category })); }
  setFormat(format: EventFilters['format']): void { this.filters.update((value) => ({ ...value, format })); }
  resetFilters(): void { this.filters.set({ query: '', category: 'all', format: 'all' }); }
  resetDemo(): void { this.snapshot.set(seed()); this.resetFilters(); }
}
