import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { applicationConfig } from './app/app.config';

bootstrapApplication(AppComponent, applicationConfig).catch((err) =>
  console.error(err)
);
