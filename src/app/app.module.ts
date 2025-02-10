import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { YourIdeasComponent } from './pages/your-ideas/your-ideas.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YourIdeasComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptorsFromDi()), // New way to provide HttpClient
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
