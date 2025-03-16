import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  userForm!: FormGroup;
  base64String: string='';
  imageSrc: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private barCodeService:BarCodeScannerService
  ) {}

  
  ngOnInit(): void {
    this.initializeForm();
    this.userForm.valueChanges.pipe(
        debounceTime(300), // Wait for 300ms after each keystroke
        distinctUntilChanged() // Only emit if the value has changed
      ).subscribe((value) => {
console.log('Form Value Changed:', value);
      });
  }

 initializeForm(){
    this.userForm = this.fb.group({
      id: [null], // Optional, since it might be auto-generated
      employeeUniqueId: [null],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      departmentName: ['', Validators.required],
      designation: ['', Validators.required],
      barcode: [null],
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
  
    });
  }
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const user = this.userForm.value;
    this.barCodeService.registration(user).subscribe({
      next:(response) =>{
        this.base64String = response.image;
        this.imageSrc = `data:image/png;base64,${this.base64String}`;
        this.downloadImage();
        this.router.navigate(['']); // Redirect to login page after registration
      },
      error:(error)=>{
        
        console.error('Registration failed', error);
      }
    });
  }

  downloadImage() {
    if (this.base64String) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${this.base64String}`;
      link.download = 'image.png'; // You can change the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}