import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventCategory, EventFormat } from '../../core/event.models';
import { EventStore } from '../../core/event.store';

@Component({selector:'app-organizer-page',standalone:true,imports:[CurrencyPipe,DatePipe,ReactiveFormsModule],templateUrl:'./organizer.page.html',styleUrl:'./organizer.page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class OrganizerPage {
  readonly store=inject(EventStore);private readonly fb=inject(FormBuilder);readonly modalOpen=signal(false);
  readonly form=this.fb.nonNullable.group({title:['',[Validators.required,Validators.minLength(5)]],subtitle:['',[Validators.required,Validators.minLength(8)]],date:['2027-01-30',Validators.required],startTime:['10:00',Validators.required],endTime:['18:00',Validators.required],venue:['Tech Hub',Validators.required],city:['Москва',Validators.required],category:['Frontend' as EventCategory,Validators.required],format:['offline' as EventFormat,Validators.required],price:[1500,[Validators.required,Validators.min(0)]],capacity:[150,[Validators.required,Validators.min(1)]],color:['#ef5b3f',Validators.required],description:['Практическое событие для IT-сообщества.',Validators.required],tags:['Angular, Community']});
  submit():void{if(this.form.invalid){this.form.markAllAsTouched();return;}const value=this.form.getRawValue();this.store.createEvent({...value,tags:value.tags.split(',').map((v: string)=>v.trim()).filter(Boolean)});this.modalOpen.set(false);this.form.controls.title.setValue('');}
}
