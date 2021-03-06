import { LoanApplicationService } from './../services/loan.application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication, User, Role } from '../models';
import { AlertService } from '../services';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  templateUrl: './view-loan-application.component.html'
})
export class ViewLoanApplicationComponent implements OnInit {
  pageTitle: string = '';
  loanApplicationFormGroup: FormGroup;
  loanApplication: LoanApplication;
  loggedInUser: User;
  error: any = { isError: false, errorMessage: '' };

  constructor(
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
      },
      error: err => this.alertService.error(err)
    });
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  refreshStatus() {
    console.log('Refresh status!!!!');
  }

}
