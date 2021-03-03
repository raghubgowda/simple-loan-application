import { LoanApplicationService } from './../services/loan.application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication, User } from '../models';
import { AlertService, AuthenticationService } from '../services';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DatePipe } from '@angular/common';
import { LoanApplicationComponent } from './loan.application.component';

@Component({
  templateUrl: './loan-application-detail.component.html'
})
export class LoanApplicationDetailComponent implements OnInit {
  pageTitle: string = '';
  loanApplicationFormGroup: FormGroup;
  LoanApplication: LoanApplication;
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
    this.authenticationService.currentUser.subscribe(user => this.loggedInUser = user);
  };

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.loanApplicationService.getLoanApplicationDetails(id).subscribe({
        next: loanApplication => {
          this.pageTitle = `Loan Application Details`;
          this.loanApplicationFormGroup = this.formBuilder.formGroup(LoanApplication, loanApplication);
        },
        error: err => this.alertService.error(err)
      });
    }
    else {
      this.pageTitle = `Apply for new Loan`;
      let loanApplication = new LoanApplication();
      loanApplication.applicantEmailId = this.loggedInUser.email;
      this.loanApplicationFormGroup = this.formBuilder.formGroup(LoanApplication, loanApplication);
    }
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  onSubmit() {
    let updateLoanApplication = new LoanApplication(this.loanApplicationFormGroup.value);

    this.loanApplicationService.updateLoanApplication(updateLoanApplication)
      .pipe()
      .subscribe(
        data => {
          this.alertService.success('Loan Application Details saved successfully', true);
          this.router.navigate(['']);
        },
        error => {
          this.alertService.error(error);
        });
  }

}
