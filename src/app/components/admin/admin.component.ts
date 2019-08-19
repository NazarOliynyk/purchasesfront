import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {HttpHeaders} from '@angular/common/http';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  modal;
  user: User;
  users: User [];
  headersOption: HttpHeaders;
  show = false;
  userToDelete: User;

  constructor( private mainService: MainServiceService) { }

  ngOnInit(): void {

    this.modal = document.getElementById('modalMessage');
    if (localStorage.getItem('_token') !== null ) {
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      if (this.user.username === 'admin') {
        this.headersOption =
          new HttpHeaders({Authorization: localStorage.getItem('_token')});
        this.getUsers();
      }
    }
  }

  getUsers() {
    this.mainService.findAllUsers(this.headersOption).
    subscribe(value => {this.users = value;
                        this.show = true; },
      error1 => alert('Failed to load users'));
  }


  deleteUser(u: User) {
    this.userToDelete = u;
    this.modal.style.display = 'block';
  }
  closeModal() {
    this.modal.style.display = 'none';
  }

  deleteAnyway() {

        this.mainService.deleteUser(this.userToDelete, this.headersOption).
        subscribe(data => {
            // alert(data.text);
            this.modal.style.display = 'none';
            this.getUsers();
          },
          err => {console.log('err: ' + err.toString());
                  alert('Failed to delete!'); } );
  }

}
