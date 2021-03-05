import { LoanApplicationService } from '../services/loan.application.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanApplication, User } from '../models';
import { AlertService } from '../services';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  templateUrl: './review-loan-application.component.html'
})
export class ReviewLoanApplicationComponent implements OnInit {
  pageTitle: string = '';
  loanApplicationFormGroup: FormGroup;
  loanApplication: LoanApplication;
  loggedInUser: User;
  error: any = { isError: false, errorMessage: '' };

  constructor(
    private formBuilder: RxFormBuilder,
    private activatedRoute: ActivatedRoute,
    private loanApplicationService: LoanApplicationService,
    private router: Router,
    private alertService: AlertService) {
  };

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loanApplicationService.getLoanApplicationDetails(id).subscribe({
      next: loanApplication => {
        this.loanApplication = loanApplication;
        this.pageTitle = `Loan Application Details`;
        this.loanApplicationFormGroup = this.formBuilder.formGroup(LoanApplication, loanApplication);
      },
      error: err => this.alertService.error(err)
    });
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
          this.alertService.success('Loan Application Updated Successfully', true);
          this.router.navigate(['']);
        },
        error => {
          this.alertService.error(error);
        });
  }

}
