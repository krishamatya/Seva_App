import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './dashboard.model';


@Injectable({ providedIn: 'root' })
export class BarCodeScannerService {
  private apiUrl = 'https://localhost:7181/api/Authentication'; // Replace with your API URL
  
  constructor(private http: HttpClient) {}
  loginWithBarcode(barcode: string): Observable<{ token: string; id: number }> {
    return this.http.post<{ token: string; id: number }>(this.apiUrl+'/login/qr', { base64String:barcode }).pipe(
      map((response) => {
        // Return the token and ID from the API response
        return { token: response.token, id: response.id };
      }),
      catchError((error) => {
        // Handle errors and return a default value or throw an error
        console.error('Login Error:', error);
        throw new Error('Login failed. Please try again.');
      })
    );
  }

  registration(userData: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    //return this.http.post<any>(`${this.apiUrl}/register`, userData, { headers });
    return this.http.post(`${this.apiUrl}/register`, userData, {headers});
  }
  login(userData: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.apiUrl}/login`, userData, {headers});
  }
 
  
  getDashBoard(id:number):Observable<User> 
    {
      const token = localStorage.getItem('jwt_token');
      const url = this.apiUrl+`/dashboard/?id=${id}`;

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Replace with your actual token
      });
  
      return this.http.get<User>(url, { headers }).pipe(
        map(response => {
          // Transform the response if needed
          return response as User;
        })
      );
     // return  this.http.get<User>(this.apiUrl+'/dashboard/?id=${this.id}');
    }

    getUser():Observable<User> 
    {
      const token = localStorage.getItem('jwt_token');
      const url = this.apiUrl+`/login`;

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Replace with your actual token
      });
  
      return this.http.get<User>(url, { headers }).pipe(
        map(response => {
          // Transform the response if needed
          return response as User;
        })
      );
     // return  this.http.get<User>(this.apiUrl+'/dashboard/?id=${this.id}');
    }
   
  
}