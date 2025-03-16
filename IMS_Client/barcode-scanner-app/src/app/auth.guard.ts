import {Injectable} from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BarCodeScannerService } from './barcode-scanner.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor (private router:Router,private barCodeService:BarCodeScannerService){
 
    }
    //user is allowed to access a route based on some condition.
    canActivate(): boolean {
        if (localStorage.getItem('isLoggedIn')=== 'true') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    }