import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,CommonModule, ReactiveFormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit
{
  loginForm!: FormGroup;
  id: number | null = null;
  isLoggedIn : boolean = false;
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

      if(localStorage.getItem('isLoggedIn') === 'true') 
        this.isLoggedIn = true;
      else
      this.isLoggedIn = false;
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      id: [0], 
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
          localStorage.setItem('isLoggedIn', 'true'); // Persist session
          this.router.navigate(['/dashboard', user.id]); // Redirect to login page after registration
        },
      error:(error)=>
        {
          console.error('Login failed', error);
          localStorage.removeItem('isLoggedIn');
          this.router.navigate([''])
        }
  })
  }
 
    
 

 

}
