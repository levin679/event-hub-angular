import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventStore } from '../../core/event.store';

@Component({selector:'app-check-in-page',standalone:true,imports:[FormsModule],templateUrl:'./check-in.page.html',styleUrl:'./check-in.page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class CheckInPage {
  readonly store=inject(EventStore);readonly code=signal('TKT-1042');readonly status=signal<'idle'|'success'|'error'|'used'>('idle');readonly message=signal('');
  checkedInCount():number{return this.store.registrations().filter((ticket)=>ticket.checkedIn).length;}
  check():void{const existing=this.store.registrations().find(item=>item.id.toUpperCase()===this.code().trim().toUpperCase());if(!existing){this.status.set('error');this.message.set('Билет не найден');return;}if(existing.checkedIn){this.status.set('used');this.message.set(`Билет ${existing.id} уже был использован`);return;}const result=this.store.checkIn(this.code());this.status.set('success');this.message.set(`Добро пожаловать, ${result?.attendeeName}`);}
}
