export interface BillingAccount {
  id: string;
  bankName: string;
  iban: string;
  invoiceTitle: string;
  taxId: string;
  isPrimary: boolean;
}
