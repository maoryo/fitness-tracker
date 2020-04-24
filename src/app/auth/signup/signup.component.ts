import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  private loadingSub: Subscription;


  constructor(private authService: AuthService,
              private uiService: UiService) {
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        birthDate: new FormControl('', Validators.required),
        agreedTerms: new FormControl('', Validators.requiredTrue)
      }
    );
  }

  onSignup() {
    this.authService.registerUser({
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

}
