import { required, prop } from "@rxweb/reactive-form-validators";

export class LoanApplication {
    @prop()
    id: string;
    @required()
    name: string;
    @required()
    dob: Date;
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
    isApproved: boolean = false;

    constructor(cfg: Partial<LoanApplication> = {}) {
        Object.assign(this, cfg);
    }
}
