import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { User,Attendence } from '../dashboard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: User | undefined;
  userId: string | null = null;
  count:number|null=null;
  isLoading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute,private barCodeService:BarCodeScannerService) {
    this.route.params.subscribe(params => {
      this.userId = params['userId']; // Get the id from the route
      this.fetchUserData();
    });
  
  }

  fetchUserData() {
    if (this.userId === null) return;
    this.barCodeService.getUserInfo(this.userId).subscribe({
      next:(response) =>{
        this.user = response;
        this.count=this.user.attendances.length;
        this.isLoading = false;
      },
      error:(error)=>{
        this.isLoading = false;
        console.error('Login failed', error);
      }
    });
   
  }
}
