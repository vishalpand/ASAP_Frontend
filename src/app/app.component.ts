import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import {
  personCircle,
  personCircleOutline,
  sunny,
  sunnyOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  dark: boolean = false;
  paletteToggle: boolean = false;
  isLoggedIn: boolean = false; // Track login state
  isloggedOut: boolean = false;
  isheader: boolean = false;

  // Menu items for app navigation
  public appPages = [{ title: 'Ideas', url: '/ideas', icon: 'bulb' }];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private authService: AuthService, private router: Router) {
    // Check if dark mode was saved previously
    // const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    // this.dark = darkModeEnabled;
    // this.applyDarkMode(); // Apply the dark mode if it's enabled
    // Subscribe to authentication status changes
    // this.authService.isLoggedIn.subscribe((status) => {
    //   this.isLoggedIn = status; // Update the login state based on the service
    // });
    // this.isLoggedIn = true;
    // addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches)
    );
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: any) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: any) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  // Toggle dark mode and save the preference in localStorage
  // toggleDarkMode() {
  //   this.dark = !this.dark;
  //   localStorage.setItem('darkMode', this.dark.toString());
  //   this.applyDarkMode();
  // }

  // // Login/Logout toggle
  // toggleLogin() {
  //   if (this.isLoggedIn) {
  //     // If logged in, log out the user and navigate to the login page
  //     this.authService.logout();
  //     this.router.navigate(['/login']);
  //   } else {
  //     // If logged out, log the user in and navigate to the home page
  //     this.authService.login();
  //     this.router.navigate(['/home']);
  //   }
  // }

  login() {
    this.isLoggedIn = false;
    this.isheader = true;
    this.isloggedOut = true;
    this.router.navigate(['/home']); // Home component par redirect karein
  }

  // Logout function
  Onlogout() {
    this.isloggedOut = false;
    this.isLoggedIn = false;
    this.isheader = false;
    localStorage.clear();
    this.router.navigate(['/login']); // Login page par redirect karein
  }

  // Apply dark mode by toggling the 'dark' class on the body element
  private applyDarkMode() {
    document.body.classList.toggle('dark', this.dark);
  }

  fistTimeOnhome() {
    this.isheader = true;
    // this.isLoggedIn = true;
  }

  firstTimeonlogin() {
    this.isloggedOut = false;
    this.isheader = false;
    this.isLoggedIn = true;
  }
}
