import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegistrationComponent },
    { path:'dashboard/:id',component:DashboardComponent},
    { path:'barcodescanner',component:BarcodeScannerComponent}
];
