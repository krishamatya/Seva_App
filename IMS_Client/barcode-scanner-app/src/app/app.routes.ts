import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegistrationComponent },
    { path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
    { path:'barcodescanner',component:BarcodeScannerComponent},
    { path:'user/:Id',component:UserComponent}
];
