export type EventCategory = 'Frontend' | 'Backend' | 'Design' | 'Data' | 'Career' | 'Community';
export type EventFormat = 'offline' | 'online' | 'hybrid';

export interface Speaker {
  name: string;
  role: string;
  initials: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  city: string;
  category: EventCategory;
  format: EventFormat;
  price: number;
  capacity: number;
  registered: number;
  featured: boolean;
  color: string;
  description: string;
  tags: string[];
  speakers: Speaker[];
}

export interface Registration {
  id: string;
  eventId: string;
  attendeeName: string;
  email: string;
  ticketType: 'standard' | 'student' | 'online';
  price: number;
  createdAt: string;
  checkedIn: boolean;
}

export interface EventHubSnapshot {
  events: EventItem[];
  registrations: Registration[];
  favorites: string[];
  schedule: string[];
}

export interface EventFilters {
  query: string;
  category: EventCategory | 'all';
  format: EventFormat | 'all';
}
