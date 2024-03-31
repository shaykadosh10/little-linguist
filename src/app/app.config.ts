import { NgModule } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const applicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()), provideAnimationsAsync()],
};
