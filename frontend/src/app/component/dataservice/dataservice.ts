import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root' // This should make it available application-wide
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Update with your backend URL

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, { email, password });
  }

  // Method to handle the login response
  handleLoginResponse(response: any): void {
    if (response && response.token) {
      // Store the JWT token in a cookie
      this.cookieService.set('token', response.token, { secure: true, sameSite: 'Strict' });
      console.log('Token stored successfully:', response.token); // Success message
    } else {
      console.error('No token received in response');
    }
  }
  

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
