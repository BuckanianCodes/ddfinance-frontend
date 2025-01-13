import { AfterViewInit, Component, OnInit,Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InsuranceService } from '../../services/insurance.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceDto } from '../../models/Insurance';
import { ToastrService } from 'ngx-toastr';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { DOCUMENT } from '@angular/common';

gsap.registerPlugin(ScrollTrigger)
@Component({
  selector: 'app-add-insurance',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-insurance.component.html',
  styleUrl: './add-insurance.component.css'
})
export class AddInsuranceComponent implements OnInit,AfterViewInit{
  protected insuranceForm!:FormGroup;
  constructor(
    @Inject(DOCUMENT) private document:Document,
    private service:InsuranceService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router
  ){}
  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }
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
  initScrollAnimations():void{
    gsap.from(this.document.querySelector('.heading'),{
      duration:0.5,
      opacity:0,
      y:-20,
      stagger:0.2,
      delay:0.5
    })
    gsap.from(this.document.querySelector('.back-btn'),{
      duration:0.5,
      opacity:0,
      x:20,
      stagger:0.2,
      delay:0.6
    })
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
