import { Routes } from '@angular/router';
import { AddInsuranceComponent } from './pages/add-insurance/add-insurance.component';
import { ListInsurancesComponent } from './pages/list-insurances/list-insurances.component';

export const routes: Routes = [
    {path:'',component:ListInsurancesComponent},
    {path:'add-policy',component:AddInsuranceComponent}
];
