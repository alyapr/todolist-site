import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';

// Pastikan HttpClientModule juga ditambahkan di providers
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Menambahkan HttpClientModule
    importProvidersFrom(RouterModule.forRoot(routes)), // Menambahkan RouterModule dengan forRoot
  ],
}).catch((err) => console.error(err));
