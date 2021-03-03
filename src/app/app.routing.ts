import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './helpers';
import { RoleGaurd } from './helpers/role.guard';
import { LoanApplicationDetailComponent } from './loan-application/loan-application-detail.component';
import { LoanApplicationComponent } from './loan-application';

const routes: Routes = [
    { path: '', component: LoanApplicationComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'editFeature/:id', component: LoanApplicationDetailComponent, canActivate: [RoleGaurd] },
    { path: 'addFeature', component: LoanApplicationDetailComponent, canActivate: [RoleGaurd] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
