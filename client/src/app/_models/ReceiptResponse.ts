import { Account } from './';

export interface ReceiptData {
  verificationSerie: string;
  description: string;
  receiptDate: Date;
  accounts: Account[];
}

export interface ReceiptResponse {
  success: boolean;
  data: ReceiptData;
  time: Date;
}
