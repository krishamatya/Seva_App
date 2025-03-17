import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { BarCodeScannerService } from '../barcode-scanner.service';
import { User } from '../dashboard.model';
import { CommonModule } from '@angular/common';
import { BarcodeScannerComponent } from "../barcode-scanner/barcode-scanner.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, BarcodeScannerComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  user: User[]=[];
  userId: string | null = null;
  count:number|null=null;
  isLoading = true;
  roles:string|null=null;

  constructor(private http: HttpClient, private route: ActivatedRoute,private barCodeService:BarCodeScannerService) {
       
  }
  ngOnInit(): void {
      this.barCodeService.getLoginInfo().subscribe((user)=>{
        if(user){
          this.userId = user.userId,
          this.roles = user.roles;
        }
      });
      this.fetchDashboardData();
  }

  fetchDashboardData() {
    if (this.userId === null) return;
    this.barCodeService.getUser(this.userId).subscribe({
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

  trackByItemId(index: number, item: any): number {
    return item.id;
  }
}
