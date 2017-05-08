export class ExtractAccountResponse {

  constructor(
    public accounts: [{
      account: number,
      debit: number,
      credit: number
    }]
  ) { }
}
