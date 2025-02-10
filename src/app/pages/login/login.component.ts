import { AuthService } from 'src/app/services/auth.service';
import { userAuth } from './../../models/userAuth.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible: boolean = false;
  alertButtons: any = [
    {
      text: 'OK',
      role: 'cancel',
      handler: () => {
        console.log('OK clicked');
      },
    },
  ];

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';

  newPasswordType: string = 'password';
  newPasswordIcon: string = 'eye-off';

  isSign: boolean = false;
  isSingnUp: boolean = false;
  isPassword: boolean = false;

  userAuth: userAuth = new userAuth();

  userNameorNumber: any;
  email: any;
  mobileNumber: any;
  password: any;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private appComponent: AppComponent,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.isSign = true;
    this.appComponent.firstTimeonlogin();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordVisibility1(field: string) {
    if (field === 'password') {
      this.passwordType =
        this.passwordType === 'password' ? 'text' : 'password';
      this.passwordIcon = this.passwordType === 'text' ? 'eye' : 'eye-off';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordType =
        this.confirmPasswordType === 'password' ? 'text' : 'password';
      this.confirmPasswordIcon =
        this.confirmPasswordType === 'text' ? 'eye' : 'eye-off';
    }
  }

  togglePasswordVisibility2(field: string) {
    if (field === 'newPassword') {
      this.newPasswordType =
        this.newPasswordType === 'password' ? 'text' : 'password';
      this.newPasswordIcon =
        this.newPasswordType === 'text' ? 'eye' : 'eye-off';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordType =
        this.confirmPasswordType === 'password' ? 'text' : 'password';
      this.confirmPasswordIcon =
        this.confirmPasswordType === 'text' ? 'eye' : 'eye-off';
    }
  }

  onRegister() {
    this.userAuth = new userAuth();
    this.isSign = false;
    this.isSingnUp = true;
  }

  AlreadyRegistered() {
    this.isSign = true;
    this.isSingnUp = false;
  }

  forgetPassword() {
    if (this.userAuth.userEmailorNumber) {
      this.isPassword = true;
      this.isSign = false;
      this.isSingnUp = false;
    } else {
    }
  }

  saveUserAuth() {
    console.log(this.userAuth);

    if (!this.userAuth.userEmailorNumber) {
      this.showAlert('Email or Number is required.');
      return;
    }

    if (
      !this.isValidEmail(this.userAuth.userEmailorNumber) &&
      isNaN(Number(this.userAuth.userEmailorNumber))
    ) {
      this.showAlert('Please enter a valid email or phone number.');
      return;
    }

    if (!this.userAuth.password) {
      this.showAlert('Password is required.');
      return;
    }

    if (this.userAuth.password.length < 8) {
      this.showAlert('Password must be at least 8 characters long.');
      return;
    }

    if (this.userAuth.password !== this.userAuth.confirmPassword) {
      this.showAlert('Passwords do not match.');
      return;
    }

    this.authservice.authlogin(this.userAuth).subscribe(
      (response) => {
        console.log(response.serviceResponse);

        this.isPassword = false;
        this.isSign = true;
        this.isSingnUp = false;
        this.userAuth = new userAuth();
        this.showAlert(response.serviceResponse);
      },
      (error) => {}
    );
  }

  onLogin() {
    console.log(this.userAuth);

    if (!this.userAuth.userEmailorNumber) {
      this.showAlert('Email or Number is required.');
      return;
    }

    if (
      !this.isValidEmail(this.userAuth.userEmailorNumber) &&
      isNaN(Number(this.userAuth.userEmailorNumber))
    ) {
      this.showAlert('Please enter a valid email or phone number.');
      return;
    }

    if (this.userAuth.password == null || this.userAuth.password == '') {
      this.showAlert('Password is required.');
      return;
    }

    if (this.userAuth.password.length < 8) {
      this.showAlert('Password must be at least 8 characters long.');
      return;
    }

    this.authservice.onLogin(this.userAuth).subscribe(
      (response: any) => {
        if (response.serviceStatus == 'Success') {
          localStorage.setItem('isLogged', 'true');

          if (/^\d{10}$/.test(this.userAuth.userEmailorNumber)) {
            localStorage.setItem(
              'mobileNumber',
              this.userAuth.userEmailorNumber
            );
          } else if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              this.userAuth.userEmailorNumber
            )
          ) {
            // If userNameorNumber matches email format, treat it as an email
            localStorage.setItem('emailid', this.userAuth.emailid);
          } else {
          }

          this.userAuth = new userAuth();

          this.appComponent.login();
        }

        if (response.serviceStatus == 'Fail') {
          this.showAlert(response.serviceResponse);
        }
      },
      (error: any) => {
        console.log('auth', error);
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  back() {
    this.isPassword = false;
    this.isSign = true;
    this.isSingnUp = false;
  }

  updatePass() {
    if (!this.userAuth.newPassword) {
      this.showAlert('Password is required.');
      return;
    }

    if (this.userAuth.newPassword.length < 8) {
      this.showAlert('Password must be at least 8 characters long.');
      return;
    }

    if (this.userAuth.newPassword !== this.userAuth.confirmPassword) {
      this.showAlert('Passwords do not match.');
      return;
    }

    this.authservice.onUpdatePassword(this.userAuth).subscribe(
      (response: any) => {
        console.log(response.serviceResponse);
        this.isPassword = false;
        this.isSign = true;
        this.isSingnUp = false;
        this.userAuth = new userAuth();
        this.showAlert(response.serviceResponse);
      },
      (error: any) => {}
    );
  }

  async showAlert(alertMessage: any) {
    const alert = await this.alertCtrl.create({
      message: alertMessage,
      buttons: this.alertButtons,
    });
    await alert.present();
  }
}
