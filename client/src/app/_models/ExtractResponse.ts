import { ExtractData } from 'app/_models/ExtractData';

export class ExtractResponse {

  constructor(
    public success: boolean,
    public data: ExtractData,
    public time: string
  ) { }
}
