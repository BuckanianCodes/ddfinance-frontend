import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiResponse, InsuranceDto } from '../models/Insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  //baseUrl = 'http://localhost:5067/api/Insurance'
  baseUrl = 'https://ddfinance.onrender.com/api/Insurance'

  constructor(private http:HttpClient) { }

  getInsurances(search:any){
    let params = new HttpParams();
    if(search){
      params = params.append('search',search)
    }
    return this.http.get(this.baseUrl,{observe:'response',params})
      .pipe(
        map(res => {
          return res.body
        })
      )
   }
   addInsurance(data: { insuranceName: string; insuranceDescription: string }){
    const formData = new FormData();
    formData.append('InsuranceName', data.insuranceName);
    formData.append('InsuranceDescription', data.insuranceDescription);

    return this.http.post<ApiResponse>(this.baseUrl,formData)
   }
   editInsurance(insuranceId:number,data:InsuranceDto){
    return this.http.put<ApiResponse>(`${this.baseUrl}/${insuranceId}`,data)

   }
   deleteinsurance(insuranceId:any){
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${insuranceId}`)
   }
}
