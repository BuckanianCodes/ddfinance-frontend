import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceDto } from '../../models/Insurance';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-insurance',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-insurance.component.html',
  styleUrl: './add-insurance.component.css'
})
export class AddInsuranceComponent implements OnInit{
  protected insuranceForm!:FormGroup;
  constructor(private service:InsuranceService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.initializeForm()
  }
  private initializeForm():void{
    this.insuranceForm = this.fb.group({
      InsuranceName:this.fb.control('',Validators.required),
      InsuranceDescription:this.fb.control('',Validators.required)
    })
  }
  onSubmit(){
    if(!this.insuranceForm.valid){
      this.toastr.error("Provide data")
      //console.log("provide data")
      return
    }
    this.addInsurance()
  }
  private addInsurance(){
    const insuranceData:InsuranceDto = {
      insuranceName:this.insuranceForm.controls['InsuranceName'].value,
      insuranceDescription:this.insuranceForm.controls['InsuranceDescription'].value
    }
    //console.log(insuranceData)
    this.service.addInsurance(insuranceData).subscribe(
      {
        next:(res) => {
          this.toastr.success(res?.message)
          this.router.navigateByUrl("/")
          console.log(res)
        },
        error:(err) => {
          const errorTitle = err?.error?.title || 'An unexpected error occurred';
          this.toastr.info(errorTitle)
          console.log(err)
        }
      }
    )
  }

}
