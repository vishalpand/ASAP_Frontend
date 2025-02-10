import { Component, OnInit } from '@angular/core';

import { UserDetails } from 'src/app/models/usersDetails.model';
import { UserDetailsService } from 'src/app/services/user-deatils.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-your-ideas',
  templateUrl: './your-ideas.component.html',
  styleUrls: ['./your-ideas.component.scss'],
})
export class YourIdeasComponent implements OnInit {
  alertButtons: any = [
    {
      text: 'OK',
      role: 'cancel',
      handler: () => {
        console.log('OK clicked');
      },
    },
  ];

  isdeasPage: boolean = false;
  isReachout: boolean = false;
  isviewIdea: boolean = false;
  getAllUserdetaisList: any = [];
  fullName: string = '';
  MobileNumber: string = '';
  country: string = '';
  state: string = '';
  emailid: string = ';';

  userDetails: UserDetails = new UserDetails();

  constructor(
    private userDetailsService: UserDetailsService,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.isdeasPage = true;
    this.getAllUserDetails();
  }

  ideas = [
    {
      title:
        'Want to build competitor app of Zomatoghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhggghgghgghghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhggghg',
      color: '#5D86DA',
    },
    { title: 'Want Open a Resto & Cafe', color: '#E9E9E9' },
    { title: 'Want to build competitor app of Zomato', color: '#9B7DF0' },
    { title: 'Want Open a Resto & Cafe', color: '#80E0E0' },
    { title: 'Want Open a mobile & store', color: 'green' },
  ];

  onWriteIdea(userid: any) {
    this.isdeasPage = false;
    this.isReachout = false;
    this.isviewIdea = true;
    this.userDetails = this.getAllUserdetaisList.find(
      (user: UserDetails) => user.userId === userid
    );
  }

  onReachOut(
    fullname: any,
    mobilenumber: any,
    country: any,
    state: any,
    emailid: any
  ) {
    this.isdeasPage = false;
    this.isReachout = true;

    this.fullName = fullname;
    this.MobileNumber = mobilenumber;
    this.country = country;
    this.state = state;
    this.emailid = emailid;
  }

  backReachout() {
    this.isdeasPage = true;
    this.isReachout = false;
    this.isviewIdea = false;
  }

  backviewIdeas() {
    this.isdeasPage = true;
    this.isReachout = false;
    this.isviewIdea = false;
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.userDetailsService.getAllUserDetails().subscribe(
      (response) => {
        console.log(response.serviceResponse);
        this.getAllUserdetaisList = response.serviceResponse;
      },
      (error) => {}
    );
  }

  onDeleteIdea(userId: any) {
    this.userDetailsService.onDeleteIdeas(userId).subscribe(
      (response) => {
        console.log(response.serviceResponse);
        // this.getAllUserdetaisList=response.serviceResponse;
        this.getAllUserDetails();
        this.showAlert(response.serviceResponse);
      },
      (error) => {}
    );
  }

  downloadPDF() {
    const base64Data = this.userDetails.fileData;
    const fileName = this.userDetails.fileName || 'download.pdf';
    const fileType = this.userDetails.fileType || 'application/pdf';

    // Convert base64 to binary data
    const binaryData = atob(base64Data);
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob and download
    const blob = new Blob([byteArray], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.userDetails.fileName = file.name;
      this.userDetails.fileType = file.type;

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Remove the data URL prefix
        this.userDetails.fileData = base64String; // Store the base64 string
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
  }

  saveDetails() {
    this.userDetailsService.updateUserDetails(this.userDetails).subscribe(
      (response: any) => {
        console.log('data', response);

        this.showAlert(response.serviceResponse);
      },
      (error: any) => {
        console.error('Error updating user', error);
      }
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
