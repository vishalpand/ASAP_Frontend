import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  VERSION,
} from '@angular/core';

import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from 'src/app/services/user-deatils.service';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { userAuth } from 'src/app/models/userAuth.model';
import { AppComponent } from 'src/app/app.component';
import { Country, State, City, IState, ICity } from 'country-state-city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  swiperModules = [IonicSlides];

  @ViewChild('country') country!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  @ViewChild('state') state!: ElementRef;

  name = 'Angular ' + VERSION.major;
  countries = Country.getAllCountries();
  states: IState[] | null = null; // Can hold an array of IState objects or null
  cities: ICity[] | null = null; // Can hold an array of ICity objects or null

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  showModal: boolean = false; // To control the visibility of the "Coming Soon" modal

  slides: any[] = [];
  userAuth: userAuth = new userAuth();

  isForm: boolean = false;
  isForm1: boolean = false;
  isHome: boolean = false;
  isThanks: boolean = false;
  isdeasPage: boolean = false;
  isApplication: boolean = false;
  whenclickisdeasPage: boolean = false;
  whenclickisdeasPage1: boolean = false;

  ideaForm: FormGroup = new FormGroup({});
  uploadedFile: File | null = null;
  basicDetailsForm: FormGroup = new FormGroup({});

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService,
    private router: Router,
    private authservice: AuthService,
    private appcomponet: AppComponent
  ) {
    this.basicDetailsForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(2)]],
      Email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Country: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
      about: ['', [Validators.required, Validators.minLength(10)]],
      acceptTerms: [false, Validators.requiredTrue],
    });

    this.ideaForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit() {
    this.isHome = true;
    this.isForm = false;

    this.slides = [
      { slide: { banner: 'assets/images/1.jpg' } },
      { slide: { banner: 'assets/images/2.jpeg' } },
      { slide: { banner: 'assets/images/3.jpeg' } },
      { slide: { banner: 'assets/images/4.webp' } },
      { slide: { banner: 'assets/images/Human.jpeg' } },
    ];

    this.appcomponet.fistTimeOnhome();
  }

  showComingSoon(feature: string) {
    console.log(`${feature} clicked`);
    this.showModal = true; // Display the modal
  }

  // Close the "Coming Soon" modal
  closeModal() {
    this.showModal = false; // Hide the modal
  }

  selectConrty: any;

  selectedCountry1: any;
  selectedState1: any;
  selectedCity1: any;

  onCountryChange(event: any) {
    console.log('yes');
    this.selectConrty = JSON.parse(event.detail.value);
    const selectedCountry = JSON.parse(event.detail.value); // This gives the selected country object.
    this.selectedCountry1 = this.selectConrty.name;
    this.states = State.getStatesOfCountry(selectedCountry.isoCode);
    this.selectedCountry = selectedCountry;
    this.cities = this.selectedState = this.selectedCity = null;
  }

  onStateChange(event: any): void {
    console.log('onStateChange event:', event); // Log event to inspect the structure

    // Ensure the event is defined and has the necessary detail
    if (event && event.detail && event.detail.value) {
      // const selectedCountry = JSON.parse(this.country.nativeElement.value);
      const selectedState = JSON.parse(event.detail.value); // Get the state from the event
      this.selectedState1 = selectedState.name;
      this.cities = City.getCitiesOfState(
        this.selectConrty.isoCode,
        selectedState.isoCode
      );
      this.selectedState = selectedState;
      this.selectedCity = null;
    } else {
      console.error('Invalid event or missing event.detail.value');
    }
  }

  onCityChange(event: any): void {
    this.selectedCity = JSON.parse(event.detail.value);
    const cityValue = this.selectedCity;
    this.selectedCity1 = cityValue.name;
  }

  clear(type: string): void {
    switch (type) {
      case 'country':
        this.selectedCountry =
          this.country.nativeElement.value =
          this.states =
          this.cities =
          this.selectedState =
          this.selectedCity =
            null;
        break;
      case 'state':
        this.selectedState =
          this.state.nativeElement.value =
          this.cities =
          this.selectedCity =
            null;
        break;
      case 'city':
        this.selectedCity = this.city.nativeElement.value = null;
        break;
    }
  }

  navigateTo(page: string) {
    // this.navCtrl.navigateForward(`/${page}`);

    this.userAuth.mobileNumber = localStorage.getItem('mobileNumber');
    this.userAuth.emailid = localStorage.getItem('emailid');

    this.authservice.checkUserExistence(this.userAuth).subscribe(
      (response: any) => {
        if (response.serviceStatus == 'Success') {
          this.isForm = true;
          this.isForm1 = false;
          this.isHome = false;
          this.countries = Country.getAllCountries();
        } else {
          this.appcomponet.Onlogout();
        }
      },
      (error: any) => {}
    );
  }

  // slideOpts = {
  //   initialSlide: 0,
  //   speed: 400,
  //   autoplay: {
  //     delay: 3000,  // Time between slides in milliseconds
  //     disableOnInteraction: false, // Allow autoplay to continue after user interaction
  //   },
  // };

  back() {
    this.isHome = true;
    this.isForm = false;
    this.isForm1 = false;

    if (this.basicDetailsForm) {
      this.basicDetailsForm.reset();

      this.states = [];
      this.cities = [];
    }

    if (this.ideaForm) {
      this.ideaForm.reset();
    }

    if (this.uploadedFile) {
      this.uploadedFile = null;
    }
  }

  back1() {
    this.isHome = false;
    this.isForm = true;
    this.isForm1 = false;

    if (this.ideaForm) {
      this.ideaForm.reset();
    }

    if (this.uploadedFile) {
      this.uploadedFile = null;
    }
  }

  back2() {
    this.isHome = true;
    this.isForm = false;
    this.isForm1 = false;
    this.isThanks = false;
    this.router.navigate(['/ideas']);
  }

  onSubmit(): void {
    // Ensure selected values are set in the form
    this.basicDetailsForm.patchValue({
      City: this.selectedCity,
      State: this.selectedState,
      Country: this.selectedCountry1,
    });

    // Mark all form controls as touched to trigger validation messages
    this.basicDetailsForm.markAllAsTouched();

    // Check if the form is valid before proceeding
    if (this.basicDetailsForm.valid) {
      console.log('Form Submitted Successfully:', this.basicDetailsForm.value);

      // Handle form submission logic
      this.isHome = false;
      this.isForm = false;
      this.isForm1 = true;
      this.whenclickisdeasPage = false;
    } else {
      console.log('Form is invalid. Please check the errors.');

      // Display error messages if fields are empty
      Object.keys(this.basicDetailsForm.controls).forEach((key) => {
        const control = this.basicDetailsForm.get(key);
        if (control && control.invalid) {
          console.log(`${key} is invalid:`, control.errors);
        }
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
    }
  }

  upload() {
    const description = this.ideaForm.get('description')?.value;
    const country = this.ideaForm.get('Country')?.value;
    console.log('Description:', description);

    if (this.uploadedFile) {
      console.log('Uploaded File:', this.uploadedFile.name);
    } else {
      console.log('No file uploaded');
    }

    console.log('ckeed', this.basicDetailsForm);

    this.userDetailsService
      .saveUserDetails(
        this.basicDetailsForm.value,
        this.uploadedFile,
        description,
        country
      )
      .subscribe(
        (response: any) => {
          if (response.serviceStatus == 'Success') {
            this.isHome = false;
            this.isForm = false;
            this.isForm1 = false;
            this.isThanks = true;
            this.basicDetailsForm.reset();
            this.ideaForm.reset();
            this.uploadedFile = null;
          }
        },
        (error: any) => {
          // Handle the error here
          console.error('Error:', error);
        }
      );
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

  applicants = [
    { name: 'Vishwakarma Jadhav', date: '31/08/2024', time: '12:30 PM' },
    { name: 'vishal Jadhav', date: '31/08/2024', time: '12:30 PM' },
    { name: 'Ananish Jadhav', date: '31/08/2024', time: '12:30 PM' },
    { name: 'Danial Jadhav', date: '31/08/2024', time: '12:30 PM' },
    { name: 'Shirish Jadhav', date: '31/08/2024', time: '12:30 PM' },
  ];

  onWriteIdea(index: number) {
    console.log(`Write Idea clicked for item ${index}`);
    this.isHome = false;
    this.whenclickisdeasPage = true;
    this.isdeasPage = false;
  }

  onReachOut(index: number) {
    console.log(`Reach Out clicked for item ${index}`);
    this.isdeasPage = false;
    this.isApplication = true;
  }

  applicationBack() {
    this.isdeasPage = true;
    this.isApplication = false;
  }

  isideaspageback() {
    this.isdeasPage = true;
    this.isApplication = false;
    this.whenclickisdeasPage = false;
  }
}
