import {Injectable} from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BarCodeScannerService } from './barcode-scanner.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
  isreturn:boolean=false;
    constructor (private router:Router,private barCodeService:BarCodeScannerService){
 
    }
    //user is allowed to access a route based on some condition.
    canActivate(): boolean 
    {
      
      this.barCodeService.getLoginInfo().subscribe((user)=>{
        if(user){
          this.isreturn = true;
        }
        else{
          this.router.navigate(['']);
         this.isreturn = false;
        }
      });
         return this.isreturn;
        
      }
    }