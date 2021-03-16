import { LoanApplicationService } from './../services/loan.application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication, User, Role } from '../models';
import { AlertService, AuthenticationService } from '../services';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

@Component({
  templateUrl: './view-loan-application.component.html'
})
export class ViewLoanApplicationComponent implements OnInit {
  pageTitle: string = '';
  loanApplicationFormGroup: FormGroup;
  loanApplication: LoanApplication;
  userRole: Role = Role.Applicant;
  error: any = { isError: false, errorMessage: '' };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private loanApplicationService: LoanApplicationService,
    private router: Router,
    private alertService: AlertService) {
      this.userRole = this.authenticationService.currentUserValue.role;
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

  reviewApplication(id: string): void {
    this.router.navigate(['/reviewApplication', id]);
  }

}
