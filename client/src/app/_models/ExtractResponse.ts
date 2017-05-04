export class ExtractResponse {

  constructor(
    public success: boolean,
    public data: {
      verificationSerie: string,
      description: string,
      receiptDate: Date,
      accounts: {
        account: number,
        debit: number,
        credit: number
      }[]
    },
    public time: Date
  ) { }
}
