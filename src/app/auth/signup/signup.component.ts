import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
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

}
