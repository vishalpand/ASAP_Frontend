import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { userAuth } from '../models/userAuth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  authlogin(authuser: userAuth): Observable<any> {
    //   userNameorNumber:any
    //   password:any;
    //  confirmPassword:any;
    //   mobileNumber:any;
    //   emailid:any;

    if (/^\d{10}$/.test(authuser.userEmailorNumber)) {
      // If userNameorNumber is a 10-digit number, treat it as a mobile number
      authuser.mobileNumber = authuser.userEmailorNumber;
    } else if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        authuser.userEmailorNumber
      )
    ) {
      // If userNameorNumber matches email format, treat it as an email
      authuser.emailid = authuser.userEmailorNumber;
    } else {
      // Handle the case where userNameorNumber is neither a valid phone number nor email
      console.log('Invalid email or mobile number format');
    }

    console.log('correct', authuser);

    const url = `${this.baseUrl}/api/users/authSave`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, authuser, { headers });
  }

  onLogin(authuser: userAuth) {
    if (/^\d{10}$/.test(authuser.userEmailorNumber)) {
      // If userNameorNumber is a 10-digit number, treat it as a mobile number
      authuser.mobileNumber = authuser.userEmailorNumber;
    } else if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        authuser.userEmailorNumber
      )
    ) {
      // If userNameorNumber matches email format, treat it as an email
      authuser.emailid = authuser.userEmailorNumber;
    } else {
      // Handle the case where userNameorNumber is neither a valid phone number nor email
      console.log('Invalid email or mobile number format');
    }

    const url = `${this.baseUrl}/api/users/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, authuser, { headers });
  }

  onUpdatePassword(authuser: userAuth) {
    if (/^\d{10}$/.test(authuser.userEmailorNumber)) {
      // If userNameorNumber is a 10-digit number, treat it as a mobile number
      authuser.mobileNumber = authuser.userEmailorNumber;
    } else if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        authuser.userEmailorNumber
      )
    ) {
      // If userNameorNumber matches email format, treat it as an email
      authuser.emailid = authuser.userEmailorNumber;
    } else {
      // Handle the case where userNameorNumber is neither a valid phone number nor email
      console.log('Invalid email or mobile number format');
    }

    const url = `${this.baseUrl}/api/users/updatePassword`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, authuser, { headers });
  }

  checkUserExistence(authuser: userAuth) {
    const url = `${this.baseUrl}/api/users/check-user-existence`;

    console.log('base url ', this.baseUrl);
    console.log('complete url ', url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, authuser, { headers });
  }
}
