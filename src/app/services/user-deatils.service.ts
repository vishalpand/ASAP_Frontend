import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Method to save user details
  saveUserDetails(userDetails: any, uploadedFile: any, description: any, country: any): Observable<any> {

    console.log('fiest cjeck,', userDetails);

    return new Observable(observer => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);

      reader.onload = () => {
        const base64FileData = reader.result?.toString().split(',')[1]; // Get base64 part after "data:*/*;base64,"

        const requestPayload = {
          fullName: userDetails.FullName,
          email: userDetails.Email,
          phoneNumber: userDetails.contact,
          address: userDetails.Address,
          city: userDetails.City,
          state: userDetails.State,
          zipCode: userDetails.zipCode,
          country: userDetails.Country,
          aboutyourSelf: userDetails.about,
          description: description,
          fileName: uploadedFile.name,
          fileType: uploadedFile.type,
          fileData: base64FileData
        };

        console.log(requestPayload);

        const url = `${this.baseUrl}/api/users/saveUserDetails`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        this.http.post<any>(url, requestPayload, { headers }).subscribe(
          response => observer.next(response),
          error => observer.error(error)
        );
      };

      reader.onerror = error => observer.error(error);
    });

  }


  getAllUserDetails() {
    return this.http.get<any>(`${this.baseUrl}/api/users/getAllUserDetails`);
  }

  onDeleteIdeas(userId: any): Observable<any>  {
    return this.http.delete<any>(`${this.baseUrl}/api/users/deleteIdea/${userId}`);
  }



  updateUserDetails(userDetails: any): Observable<any> {


    const url = `${this.baseUrl}/api/users/updateUserDetails`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(url, userDetails, { headers });
  }
  

}
