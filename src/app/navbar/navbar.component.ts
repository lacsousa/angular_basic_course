import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from '../nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  isMenuCollapsed = true;

  @Input() title: string;
  @Input() navItems: NavItem[];


}
