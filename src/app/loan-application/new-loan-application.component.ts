import { LoanApplicationService } from '../services/loan.application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication, User, Role } from '../models';
import { AlertService, AuthenticationService } from '../services';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './new-loan-application.component.html'
})
export class NewLoanApplicationComponent implements OnInit {
  pageTitle: string = '';
  loanApplicationFormGroup: FormGroup;
  LoanApplication: LoanApplication;
  isApplicant: boolean = false;
  isReviewer: boolean = false;
  loggedInUser: User;
  error: any = { isError: false, errorMessage: '' };

  constructor(
    private formBuilder: RxFormBuilder,
    private activatedRoute: ActivatedRoute,
    private loanApplicationService: LoanApplicationService,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe) {
    this.authenticationService.currentUser.subscribe(user => {
      this.loggedInUser = user;
      if(this.loggedInUser.role == Role.Applicant){
        this.isApplicant = true;
      }
      else{
        this.isReviewer = true;
      }
    });
  };

  ngOnInit() {
      this.pageTitle = `Apply for new Loan`;
      let loanApplication = new LoanApplication();
      loanApplication.applicantEmailId = this.loggedInUser.email;
      loanApplication.requestedDate = new Date();
      this.loanApplicationFormGroup = this.formBuilder.formGroup(LoanApplication, loanApplication);
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  onSubmit() {
    let newLoanApplication = new LoanApplication(this.loanApplicationFormGroup.value);

    this.loanApplicationService.applyForLoan(newLoanApplication)
      .pipe()
      .subscribe(
        data => {
          this.alertService.success('New Loan Application Created Successfully', true);
          this.router.navigate(['']);
        },
        error => {
          this.alertService.error(error);
        });
  }

}
