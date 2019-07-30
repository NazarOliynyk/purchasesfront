import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../../models/User';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  user: User;
  headersOption: HttpHeaders;
  showDeleteUserButton = true;
  showGreeting = false;

  constructor(private router: Router,
              private mainService: MainServiceService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      this.showDeleteUserButton = false;
      this.showGreeting = true;
    }
  }

  all() {
    this.router.navigate(['purchases/all'], {queryParams: this.user});
  }

  add() {
    this.router.navigate(['purchases/add'], {queryParams: this.user});
  }

  clear() {
    this.router.navigate(['purchases/clear'], {queryParams: this.user});
  }

  report() {
    this.router.navigate(['purchases/report'], {queryParams: this.user});
  }

  deleteAccount() {
    if (confirm('DO YOU REALLY WANT TO DELETE YOUR ACCOUNT???')) {

      this.mainService.deleteUser(this.user, this.headersOption).
      subscribe(data => {
          alert(data.text);
          this.router.navigate(['login']);
        },
        err => {console.log('err: ' + err.toString());
                alert('Failed to delete!'); } );
    }
  }
}
