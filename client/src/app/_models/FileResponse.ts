export interface ReceiptData {
  verificationSerie: string;
  description: string;
  receiptDate: Date;
  accounts: Account[];
}

export interface FileResponse {
  _id: string,
  username: string,
  path: string,
  originalname: string,
  filename: string,
  status: string,
  FileID: number,
  companyID: number,
  __v: number,
  extractedData: ReceiptData,
  bookedData: ReceiptData
}
