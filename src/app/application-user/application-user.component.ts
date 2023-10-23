import { Component } from '@angular/core';
import { ApplicationUser } from '../models/application-user';

@Component({
  selector: 'app-application-user',
  templateUrl: './application-user.component.html',
  styleUrls: ['./application-user.component.css']
})
export class ApplicationUserComponent {

  applicationUsers = [
    { id: 12, userName: 'jrpetry', role: 'teacher', pwd:'' },
    { id: 13, userName: 'pam', role: 'student', pwd:'' },
    { id: 14, userName: 'cerena', role: 'student', pwd: '' },
    { id: 15, userName: 'morpheus', role: 'teacher', pwd: '' },
    { id: 16, userName: 'ruben', role: 'student', pwd: '' }
  ];

  selectedApplicationUser?: ApplicationUser;

  onSelect(applicationUser: ApplicationUser): void {
    this.selectedApplicationUser = applicationUser;
  }
}
