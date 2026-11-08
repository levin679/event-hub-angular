import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../core/theme.service';

@Component({
  selector:'app-shell', standalone:true, imports:[RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl:'./shell.component.html', styleUrl:'./shell.component.scss', changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  readonly theme=inject(ThemeService); readonly menuOpen=signal(false);
  readonly navigation=[{path:'/discover',label:'События'},{path:'/schedule',label:'Моё расписание'},{path:'/tickets',label:'Билеты'},{path:'/organizer',label:'Организатор'},{path:'/check-in',label:'Check-in'}];
  close():void{this.menuOpen.set(false);}
  toggleMenu():void{this.menuOpen.update((value)=>!value);}
}
