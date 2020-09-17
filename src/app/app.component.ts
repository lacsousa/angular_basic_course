import { Component } from '@angular/core';
import { NavItem } from './nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Tour of Heroes';

  navItems: NavItem[] = [
      { path: '/dashboard', text: 'Dashboard' },
      { path: '/heroes', text: 'Heroes' },
    ];
}
