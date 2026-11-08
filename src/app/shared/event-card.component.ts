import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventItem } from '../core/event.models';
import { EventStore } from '../core/event.store';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <article class="event-card card">
      <div class="cover" [style.--event-color]="event().color">
        <span class="category">{{ event().category }}</span>
        <button type="button" [attr.aria-label]="store.isFavorite(event().id) ? 'Удалить из избранного' : 'Добавить в избранное'" (click)="store.toggleFavorite(event().id)">{{ store.isFavorite(event().id) ? '♥' : '♡' }}</button>
        <strong>{{ event().title.slice(0, 1) }}</strong>
      </div>
      <div class="body">
        <div class="date"><b>{{ event().date | date:'d':'':'ru-RU' }}</b><span>{{ event().date | date:'MMM':'':'ru-RU' }}</span></div>
        <div class="copy"><h3><a [routerLink]="['/events', event().id]">{{ event().title }}</a></h3><p>{{ event().subtitle }}</p><div class="meta"><span>◷ {{ event().startTime }}</span><span>⌖ {{ event().city }}</span><span>{{ formatLabel() }}</span></div></div>
      </div>
      <footer><span class="price">{{ event().price ? (event().price | currency:'RUB':'symbol-narrow':'1.0-0':'ru-RU') : 'Бесплатно' }}</span><span class="places">{{ event().capacity - event().registered }} мест</span><a class="btn btn-sm" [routerLink]="['/events', event().id]">Подробнее</a></footer>
    </article>
  `,
  styles: [`
    .event-card { overflow: hidden; transition: transform .18s ease, box-shadow .18s ease; }
    .event-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .cover { --event-color: var(--accent); position: relative; height: 156px; overflow: hidden; padding: 15px; background: radial-gradient(circle at 78% 20%, rgba(255,255,255,.34), transparent 27%), linear-gradient(135deg, var(--event-color), color-mix(in srgb, var(--event-color) 45%, #1f153d)); color: white; }
    .cover::after { content:''; position:absolute; width:180px; height:180px; right:-45px; bottom:-100px; border:28px solid rgba(255,255,255,.12); border-radius:50%; }
    .cover .category { padding:6px 9px; border-radius:99px; background:rgba(255,255,255,.17); font-size:.67rem; font-weight:800; backdrop-filter:blur(8px); }
    .cover button { position:absolute; right:14px; top:12px; z-index:2; width:34px; height:34px; border:0; border-radius:11px; background:rgba(255,255,255,.17); color:white; cursor:pointer; font-size:1.15rem; }
    .cover strong { position:absolute; left:18px; bottom:-18px; font-size:7.2rem; line-height:1; opacity:.14; }
    .body { display:grid; grid-template-columns:48px 1fr; gap:13px; padding:18px 18px 13px; }
    .date { width:48px; height:52px; display:grid; place-items:center; align-content:center; border-radius:13px; background:var(--accent-soft); color:var(--accent); text-align:center; }
    .date b,.date span { display:block; text-transform:uppercase; }.date b { font-size:1.1rem; line-height:1; }.date span { margin-top:3px; font-size:.6rem; font-weight:800; }
    h3 { margin:0; font-size:.95rem; line-height:1.35; } h3 a:hover { color:var(--accent); }
    p { margin:5px 0 10px; color:var(--text-muted); font-size:.71rem; line-height:1.45; }
    .meta { display:flex; flex-wrap:wrap; gap:8px 12px; color:var(--text-muted); font-size:.64rem; }
    footer { display:grid; grid-template-columns:auto 1fr auto; gap:10px; align-items:center; padding:13px 18px 18px; border-top:1px solid var(--border); }
    .price { font-size:.78rem; font-weight:850; }.places { color:var(--text-muted); font-size:.64rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent {
  readonly event = input.required<EventItem>();
  readonly store = inject(EventStore);
  formatLabel(): string { return ({ offline:'Офлайн', online:'Онлайн', hybrid:'Гибрид' })[this.event().format]; }
}
