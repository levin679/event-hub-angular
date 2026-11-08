import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventStore } from '../../core/event.store';
import { EmptyStateComponent } from '../../shared/empty-state.component';

@Component({selector:'app-tickets-page',standalone:true,imports:[CurrencyPipe,DatePipe,RouterLink,EmptyStateComponent],templateUrl:'./tickets.page.html',styleUrl:'./tickets.page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class TicketsPage { readonly store=inject(EventStore); eventTitle(id:string):string{return this.store.eventById(id)?.title??'Событие';} eventDate(id:string):string{return this.store.eventById(id)?.date??'';} }
