import { ApplicantRoleGaurd } from './helpers/applicant.role.guard';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './helpers';
import { ReviewerRoleGaurd } from './helpers/reviewer.role.guard';
import { LoanApplicationComponent } from './loan-application';
import { NewLoanApplicationComponent } from './loan-application/new-loan-application.component';
import { ReviewLoanApplicationComponent } from './loan-application/review-loan-application.component';
import { ViewLoanApplicationComponent } from './loan-application/view-loan-application.component';

const routes: Routes = [
    { path: '', component: LoanApplicationComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'viewApplication/:id', component: ViewLoanApplicationComponent, canActivate: [ApplicantRoleGaurd] },
    { path: 'applyForLoan', component: NewLoanApplicationComponent, canActivate: [ApplicantRoleGaurd] },
    { path: 'reviewApplication/:id', component: ReviewLoanApplicationComponent, canActivate: [ReviewerRoleGaurd] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
