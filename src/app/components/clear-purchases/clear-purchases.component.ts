import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {HttpHeaders} from '@angular/common/http';
import {ResponseTransfer} from '../../models/ResponseTransfer';
import {ActivatedRoute} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-clear-purchases',
  templateUrl: './clear-purchases.component.html',
  styleUrls: ['./clear-purchases.component.css']
})
export class ClearPurchasesComponent implements OnInit {


  user: User;
  headersOption: HttpHeaders;
  dateToDelete: Date;
  responseTransfer: ResponseTransfer = new ResponseTransfer();
  showForm = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mainService: MainServiceService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      this.activatedRoute.queryParams.subscribe((data: User) => {
        this.user = data;
        this.showForm = true;
      });
    }
  }

  deletePurchases(dateToDeleteForm) {
    if (confirm('DO YOU REALLY WANT TO DELETE YOUR purchases of: ' + this.dateToDelete.toString() + '???')) {

      this.responseTransfer.date = this.dateToDelete;
      this.mainService.deleteByDate(this.user, this.responseTransfer, this.headersOption).
      subscribe(value => { alert(value.text); },
        error1 => {console.log(error1);
                   alert('Failed to delete'); });

    }
  }
}
