import { LoanApplication } from '../models/loanApplication';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService {
    apiUrl: string = 'http://localhost:8080/api/v1/simple-loan-application';
    constructor(private http: HttpClient) { }

    getAllLoanApplications() {
        return this.http.get<LoanApplication[]>(`${this.apiUrl}`);
    }

    getLoanApplicationDetails(applicationId: string) {
        return this.http.get<LoanApplication>(`${this.apiUrl}/loanApplicationDetails/${applicationId}`);
    }

    applyForLoan(application: LoanApplication) {
        return this.http.post(`${this.apiUrl}`, application);
    }

    updateLoanApplication(application: LoanApplication) {
        return this.http.put(`${this.apiUrl}`, application);
    }

    deleteLoanApplication(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
