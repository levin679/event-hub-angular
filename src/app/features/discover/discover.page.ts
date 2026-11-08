import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventCategory, EventFormat } from '../../core/event.models';
import { EventStore } from '../../core/event.store';
import { EventCardComponent } from '../../shared/event-card.component';

@Component({selector:'app-discover-page',standalone:true,imports:[RouterLink,EventCardComponent],templateUrl:'./discover.page.html',styleUrl:'./discover.page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class DiscoverPage {
  readonly store=inject(EventStore);
  readonly categories:['all',...EventCategory[]]=['all','Frontend','Backend','Design','Data','Career','Community'];
  setCategory(value:string):void{this.store.setCategory(value as EventCategory|'all');}
  setFormat(value:string):void{this.store.setFormat(value as EventFormat|'all');}
}
