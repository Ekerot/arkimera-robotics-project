import { ExtractAccount } from 'app/_models/ExtractAccount';

export class ExtractData {

  constructor(
    public verificationSerie: string,
    public description: string,
    public receiptDate: Date,
    public accounts: ExtractAccount[]
  ) {}
}
