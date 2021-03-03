import { Component, OnInit } from '@angular/core';
import { Role } from '../models';
import { LoanApplicationService, AuthenticationService, AlertService } from '../services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'loan.application.component.html' })
export class LoanApplicationComponent implements OnInit {
    applications = [];
    canEdit: boolean = false;
    constructor(
        private authenticationService: AuthenticationService,
        private loanApplicationService: LoanApplicationService,
        private router: Router,
        private alertService: AlertService
    ) {
        this.canEdit = this.authenticationService.currentUserValue.role == Role.Reviewer;
    }

    ngOnInit() {
        this.loadAllApplications();
    }

    private loadAllApplications() {
        this.loanApplicationService.getAllLoanApplications()
            .pipe()
            .subscribe(applications => this.applications = applications);
    }

    applyForLoan() {
        this.router.navigate(['/applyForLoan']);
    }

    editApplication(id: string): void {
        this.router.navigate(['/editApplication', id]);
    }

    deleteApplication(id: string): void {
        this.loanApplicationService.deleteLoanApplication(id)
            .pipe()
            .subscribe(
                data => {
                    this.alertService.success('Loan Application deleted successfully', true);
                    this.loadAllApplications();
                },
                error => {
                    this.alertService.error(error);
                });
    }
}
