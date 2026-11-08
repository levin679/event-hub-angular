import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <div class="empty-icon" aria-hidden="true">{{ icon() }}</div>
      <h3>{{ title() }}</h3>
      <p>{{ text() }}</p>
    </div>
  `,
  styles: [`
    .empty-state { padding: 40px 20px; text-align: center; color: var(--text-muted); }
    .empty-icon { width: 54px; height: 54px; margin: 0 auto 12px; border-radius: 16px;
      display: grid; place-items: center; background: var(--surface-2); font-size: 24px; }
    h3 { color: var(--text); margin: 0 0 6px; font-size: 1rem; }
    p { margin: 0 auto; max-width: 420px; line-height: 1.55; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  readonly icon = input('○');
  readonly title = input.required<string>();
  readonly text = input.required<string>();
}
