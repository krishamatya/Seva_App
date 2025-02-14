import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BarCodeScannerService } from '../barcode-scanner.service';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
   imports: [HttpClientModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent{
//  @ViewChild('barcodeInput', { static: false }) barcodeInput!: ElementRef;
  barcodeData: string = ''; // Holds the scanned barcode data
  scannedText:string='';
  buffer: string = ''; // Temporary storage for characters being scanned

  constructor(private http: HttpClient, private router: Router,private barCodeService:BarCodeScannerService) {}

  // ngAfterViewInit() {
  //   // Automatically focus on the input field when the component loads
  //   this.barcodeInput.nativeElement.focus();
  // }

   @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Check if the key pressed is not a modifier key (e.g., Shift, Ctrl, Alt)
    if (event.key.length === 1) {
      this.barcodeData += event.key;
    }
    // Assuming the scanner sends an 'Enter' key at the end of the scan
    if (event.key === 'Enter') {
      this.processScannedText();
    }
  }

  processScannedText() {
    // Process the scanned text as needed
    this.barCodeService.loginWithBarcode(this.barcodeData).subscribe({
      next:(response) =>{
        localStorage.setItem('jwt_token', response.token);
        this.router.navigate(['/dashboard', response.id]);
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
          this.router.navigate(['/dashboard', response.id]);
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
