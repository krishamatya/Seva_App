import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { User,Attendence } from '../dashboard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user: User[]=[];
  id: number | null = null;
  count:number|null=null;
  isLoading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute,private barCodeService:BarCodeScannerService) {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the id from the route
      this.fetchDashboardData();
    });
  
  }

  fetchDashboardData() {
    if (this.id === null) return;
    this.barCodeService.getDashBoard(this.id).subscribe({
      next:(response) =>{
        if(Array.isArray(response)){
        this.user = response;
        }
        else{
          this.user.push(response);
        }
        this.count=this.user.length;
        this.isLoading = false;
      },
      error:(error)=>{
        this.isLoading = false;
        console.error('Login failed', error);
      }
    });
   
  }
}
