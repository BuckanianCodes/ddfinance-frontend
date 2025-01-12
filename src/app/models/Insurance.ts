export interface Insurance{
    insuranceId:number;
    insuranceName:string;
    insuranceDescription:string;
}
export interface InsuranceDto{
    insuranceName:string;
    insuranceDescription:string;
}
export interface ApiResponse {
    statusCode: number;
    message: string;
  }
  