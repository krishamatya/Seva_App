import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BarCodeScannerService } from '../barcode-scanner.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isMenuOpen = false;
 
 
constructor(private barCodeService:BarCodeScannerService,private router:Router,private location:Location){}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
 logout(){
  this.barCodeService.logout();
  this.router.navigate(['']);
 }
 goback(){
  const currentUrl = this.router.url;
  this.location.back();
   // Get current URL
  if (currentUrl === '/') {
    this.barCodeService.logout(); // Log out the user
  }
 }
}
