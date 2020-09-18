import { Component } from '@angular/core';
import { NavItem } from './nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  vTitle = 'Tour of Heroes';

  vNavItems: NavItem[] = [
      { path: '/dashboard', text: 'Dashboard' },
      { path: '/heroes', text: 'Heroes' },
    ];

  constructor(){
    const token = localStorage.getItem('token');

    if (!token) {
      const randomToken = Math.random().toString(36).substr(-10);

      localStorage.setItem('token', randomToken);
    }
  }
}
