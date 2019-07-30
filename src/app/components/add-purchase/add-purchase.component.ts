import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {HttpHeaders} from '@angular/common/http';
import {Purchase} from '../../models/Purshase';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  user: User;
  headersOption: HttpHeaders;
  purchase: Purchase = new Purchase();
  priceOfPurchase: any;
  responseOnSave: any;
  show = false;

  constructor(private mainService: MainServiceService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      this.show = true;
    }
  }

  savePurchase(addPurchaseForm) {
    this.purchase.price = parseFloat(this.priceOfPurchase);
    this.mainService.savePurchase(this.user.id, this.purchase, this.headersOption).
    subscribe(value => {this.responseOnSave = value.text; },
      error1 => {this.responseOnSave = 'Failed to save purchase!'; });
  }
}
