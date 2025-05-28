export interface InsuranceFormInputs {
  clientName: string;
  policyNumber: string;
  description: string;
  status: string;
}

export interface Insurance extends InsuranceFormInputs {
  id: number;
  createdAt?: string;
}
