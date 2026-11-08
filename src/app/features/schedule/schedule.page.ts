import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventStore } from '../../core/event.store';
import { EmptyStateComponent } from '../../shared/empty-state.component';

@Component({selector:'app-schedule-page',standalone:true,imports:[DatePipe,RouterLink,EmptyStateComponent],templateUrl:'./schedule.page.html',styleUrl:'./schedule.page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class SchedulePage { readonly store=inject(EventStore); }
