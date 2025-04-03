import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit
{
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private route: ActivatedRoute,public barCodeService:BarCodeScannerService){
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loginForm.valueChanges.pipe(
        debounceTime(300), // Wait for 300ms after each keystroke
        distinctUntilChanged() // Only emit if the value has changed
      ).subscribe((value) => {
console.log('Form Value Changed:', value);
      });
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      userId: [0], 
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const user = this.loginForm.value;
    this.barCodeService.login(user).subscribe({
      next:(response)=>
        {                
          const user = {
            userId: response.userId,
            roles: response.roles
          };
          this.barCodeService.setLoginInfo(user);
          this.router.navigate(['/dashboard']); // Redirect to login page after registration
        },
      error:(error)=>
        {
          console.error('Login failed', error);
          this.router.navigate([''])
        }
  })
  }
 
    

}
