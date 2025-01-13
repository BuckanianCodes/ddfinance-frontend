import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiResponse, InsuranceDto } from '../models/Insurance';
import { Params } from '../models/Params';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  //baseUrl = 'https://ddfinance.onrender.com/api/Insurance'
  baseUrl = 'http://localhost:5067/api/Insurance'

  constructor(private http:HttpClient) { }

  getInsurances(insuranceparams:Params){
    console.log(insuranceparams)
    let params = new HttpParams();
    if(insuranceparams.search){
      params = params.append('search',insuranceparams.search)
    }
    if(insuranceparams.ascending){
      params = params.append('ascending',insuranceparams.ascending)
    }
    if(insuranceparams.descending){
      params = params.append('descending',insuranceparams.descending)
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
