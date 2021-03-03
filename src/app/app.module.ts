import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './alert';
import { CommonModule, DatePipe } from '@angular/common';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { LoanApplicationComponent } from './loan-application';
import { LoanApplicationDetailComponent } from './loan-application/loan-application-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        RxReactiveFormsModule,
        DatePickerModule
    ],
    declarations: [
        AppComponent,
        LoanApplicationComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        LoanApplicationDetailComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
