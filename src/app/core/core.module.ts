import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [

    // Shared Modules
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Shared Components
    NavbarComponent
  ]
})
export class CoreModule { }
