import { Component, ElementRef, OnInit, ViewChild,AfterViewInit,Inject } from '@angular/core';
import { Insurance, InsuranceDto } from '../../models/Insurance';
import { InsuranceService } from '../../services/insurance.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { DOCUMENT } from '@angular/common';

gsap.registerPlugin(ScrollTrigger)
@Component({
  selector: 'app-list-insurances',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './list-insurances.component.html',
  styleUrl: './list-insurances.component.css'
})
export class ListInsurancesComponent implements OnInit,AfterViewInit{
  @ViewChild('search',{static:false}) searchTerm!:ElementRef;
  @ViewChild('edit',{static:true}) edit!:ElementRef<HTMLDivElement>;
  search:string = "";
  openForm :boolean= false;
  openDelete:boolean = false;
  insurances:any
  selectedInsurane!:Insurance
  protected editForm!:FormGroup;
  constructor(
    @Inject(DOCUMENT) private document:Document,
    private service:InsuranceService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ){
  
  }
  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }
  ngOnInit(): void {
    this.getInsurances()
    //console.log(this.insurances)
    this.initializeForm();
  }

  private initializeForm(){
    this.editForm = this.fb.group({
      InsuranceName:this.fb.control('',Validators.required),
      InsuranceDescription:this.fb.control('',Validators.required)
    })
  }
  initScrollAnimations():void{
    gsap.from(this.document.querySelector('.heading'),{
      duration:0.5,
      opacity:0,
      y:-20,
      stagger:0.2,
      delay:0.5
    })
    gsap.from(this.document.querySelector('.add'),{
      duration:0.5,
      opacity:0,
      x:20,
      stagger:0.2,
      delay:0.6
    })
    gsap.from(this.document.querySelector('.search-container'),{
      duration:0.5,
      opacity:0,
      x:-20,
      stagger:0.2,
      delay:0.6
    })
 
    gsap.from(this.document.querySelector('.insurance'),{
      duration:0.5,
      opacity:0,
      y:20,
      stagger:0.2,
      delay:0.5
    })
   
    
  }
  onSubmit(){
    if(!this.editForm.valid){
        this.toastr.error("Provide data")
        return
    }
    this.editInsurance()
  }
  private editInsurance(){
    const insuranceData:InsuranceDto = {
          insuranceName:this.editForm.controls['InsuranceName'].value,
          insuranceDescription:this.editForm.controls['InsuranceDescription'].value
    }
    this.service.editInsurance(this.selectedInsurane.insuranceId,insuranceData).subscribe(
      {
        next:(res) => {
          this.toastr.success(res?.message)
          this.getInsurances()
          //console.log(res)
          this.openForm =!this.openForm;
        },
        error:(err) => {
          const errorTitle = err?.error?.title || 'An unexpected error occurred';
          this.toastr.info(errorTitle)
          console.log(err)
        }
      }
    )
  }
  openFormFunction(insurance:Insurance):void{
    if(insurance){
      this.selectedInsurane = insurance;
      this.editForm.patchValue({
        InsuranceName: insurance.insuranceName,
        InsuranceDescription: insurance.insuranceDescription
      });
    }
    this.openForm =!this.openForm;
  }
  closeForm(){
    this.openForm =!this.openForm;
  }
  openDeleteForm(insurance:Insurance):void{
    if(insurance){
      this.selectedInsurane = insurance;
    }
    this.openDelete =! this.openDelete
  }
  closeDelete(){
    this.openDelete =! this.openDelete
  }
  deleteInsurance(){
    if(this.selectedInsurane){
      this.service.deleteinsurance(this.selectedInsurane.insuranceId).subscribe(
        {
        next:(res) => {
          this.toastr.success(res?.message)
          this.getInsurances()
          console.log(res)
          this.openDelete =!this.openDelete;
        },
        error:(err) => {
          const errorTitle = err?.error?.title || 'An unexpected error occurred';
          this.toastr.info(errorTitle)
          //console.log(err)
        }
      })
    }
  }

  getInsurances(){
    this.service.getInsurances(this.search).subscribe(res => {
      //console.log(res)
      this.insurances = res 
    })
  }
  onSearch(){
    console.log(this.searchTerm.nativeElement.value)
    this.search = this.searchTerm.nativeElement.value;
    this.getInsurances()
  }
  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.search = ""
    this.getInsurances()
  }

}
