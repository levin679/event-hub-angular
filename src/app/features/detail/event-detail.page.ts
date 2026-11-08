import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventStore } from '../../core/event.store';

@Component({selector:'app-event-detail-page',standalone:true,imports:[CurrencyPipe,DatePipe,ReactiveFormsModule,RouterLink],templateUrl:'./event-detail.page.html',styleUrl:'./event-detail.page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class EventDetailPage {
  readonly id=input.required<string>(); readonly store=inject(EventStore); private readonly fb=inject(FormBuilder);
  readonly event=computed(()=>this.store.eventById(this.id())); readonly modalOpen=signal(false); readonly ticketId=signal('');
  readonly form=this.fb.nonNullable.group({attendeeName:['Илья Лёвин',[Validators.required,Validators.minLength(3)]],email:['ilya@example.dev',[Validators.required,Validators.email]],ticketType:['student' as 'standard'|'student'|'online',Validators.required]});
  ticketPrice():number{const item=this.event();if(!item)return 0;const type=this.form.controls.ticketType.value;if(type==='online')return item.format==='offline'?item.price:item.price?Math.round(item.price*.55):0;if(type==='student')return Math.round(item.price*.7);return item.price;}
  submit():void{const item=this.event();if(!item||this.form.invalid){this.form.markAllAsTouched();return;}const registration=this.store.register({...this.form.getRawValue(),eventId:item.id,price:this.ticketPrice()});this.ticketId.set(registration.id);}
  close():void{this.modalOpen.set(false);this.ticketId.set('');}
}
