import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient,withInterceptors } from '@angular/common/http'; // Import HttpClientModule
import { importProvidersFrom } from '@angular/core'; // Import importProvidersFrom
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ReactiveFormsModule } from '@angular/forms';
//import { AuthInterceptor } from './app/interceptors/auth.service';// interceptor didnt attach to dashboard

bootstrapApplication(AppComponent, {
  providers: [
    //provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(HttpClientModule,ReactiveFormsModule,RouterModule.forRoot(routes)) // Provide HttpClientModule
  ]
}).catch(err => console.error(err));
