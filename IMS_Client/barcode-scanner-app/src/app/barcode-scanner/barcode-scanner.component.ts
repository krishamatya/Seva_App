import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { CommonModule } from '@angular/common';  // ✅ Import CommonModule

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent{
  barcodeData: string = ''; // Holds the scanned barcode data
  scannedText:string='';
  buffer: string = ''; // Temporary storage for characters being scanned

  constructor(private http: HttpClient, private router: Router,private barCodeService:BarCodeScannerService) {}

   @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.length === 1) {
      this.barcodeData += event.key;
    }
    if (event.key === 'Enter') {
      this.processScannedText();
    }
  }

  processScannedText() {
    this.barCodeService.loginWithBarcode(this.barcodeData).subscribe({
      next:(response) =>{
        localStorage.setItem('jwt_token', response.token);
        this.router.navigate(['/user', response.id]);
      },
      error:(error)=>{
        console.error('Login failed', error);
      }
    })
    this.barcodeData = '';
  }

  onBarcodeInput(event: KeyboardEvent): void {
    if (event.key === 'Enter')
      {
      // When Enter key is detected, save the barcode data
      this.barcodeData = this.buffer; // Set the scanned data
      this.barCodeService.loginWithBarcode(this.barcodeData).subscribe({
        next:(response) =>{
          localStorage.setItem('jwt_token', response.token);
          this.router.navigate(['/user', response.id]);
        },
        error:(error)=>{
          console.error('Login failed', error);
        }
      })
      this.buffer = ''; // Clear the buffer
    }
    else {
      // Append other keys to the buffer
      this.buffer += event.key;
    }
  }
 }