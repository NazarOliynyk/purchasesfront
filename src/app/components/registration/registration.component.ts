import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  modal;
  user: User = new User();
  responseRegistration: string;

  constructor( private router: Router,
               private mainService: MainServiceService) { }

  ngOnInit() {
    this.modal = document.getElementById('modalMessage');
  }

  saveUser(registerForm: HTMLFormElement) {
    this.mainService.saveUser(this.user)
      .subscribe(value => {
          this.showModal(value.text);
          if (value.text === 'User was saved successfully.') {
            this.router.navigate(['login']);
          }
        },
        error1 => { console.log(error1);
                    this.showModal('Registration Failed'); } );
  }

  showModal(message: string) {
    this.responseRegistration = message;
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }


}
