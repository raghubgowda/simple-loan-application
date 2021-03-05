import { required, prop } from "@rxweb/reactive-form-validators";
import { LoanApplicationStatus } from './loanApplicationStatus';

export class LoanApplication {
    @prop()
    id: string;
    @required()
    name: string;
    @required()
    age: Number;
    @required()
    requiredLoanAmount: number;
    @prop()
    approvedLoanAmount: number;
    @required()
    requestedDate: Date;
    @prop()
    reviewedDate: Date;
    @required()
    applicantEmailId: string;
    @prop()
    reviewerEmailId: string;
    @prop()
    reviewerComments: string;
    @prop()
    status: string = LoanApplicationStatus.Pending;

    constructor(cfg: Partial<LoanApplication> = {}) {
        Object.assign(this, cfg);
    }
}
