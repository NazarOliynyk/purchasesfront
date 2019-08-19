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

  modal;
  user: User;
  headersOption: HttpHeaders;
  dateToDelete: Date;
  responseTransfer: ResponseTransfer = new ResponseTransfer();
  showForm = false;
  responseOnDelete = '';
  deleteAnywayBTN = true;

  constructor(private activatedRoute: ActivatedRoute,
              private mainService: MainServiceService) { }

  ngOnInit(): void {

    this.modal = document.getElementById('modalMessage1');

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

  deletePurchase(dateToDeleteForm) {
    this.deleteAnywayBTN = true;
    this.responseOnDelete = 'DO YOU REALLY WANT TO DELETE YOUR purchases of: '
      + this.dateToDelete.toString() + '???';
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  deleteAnyway() {
        this.responseTransfer.date = this.dateToDelete;
        this.mainService.deleteByDate(this.user, this.responseTransfer, this.headersOption).
        subscribe(value => {
            this.modal.style.display = 'block';
            this.responseOnDelete = value.text;
            this.deleteAnywayBTN = false;
          },
          error1 => {console.log(error1);
                     this.modal.style.display = 'block';
                     this.responseOnDelete = 'Failed to delete';
                     this.deleteAnywayBTN = false;
        });
  }

}
