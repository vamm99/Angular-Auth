import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { AuthInterface } from './interface/auth.interface';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);


  createUser(user: AuthInterface): Observable<{ user: AuthInterface, message: string }> {
    return this.http.post<{ user: AuthInterface, message: string }>(`${this.API_URL}/auth/register`, user).pipe(
      map(response => { return response })
    )
  }

  login(user: AuthInterface): Observable<{ access_token: string }> {

    return this.http.post<{ access_token: string }>(`${this.API_URL}/auth/login`, user).pipe(
      map(response => { return response })
    )
  }

  me(): Observable<AuthInterface> {

    const token = this.getToken();

    if (!token) {
      throw new Error('No access token found');
    }
    const decoded: { email: string, id: string } = jwtDecode(token);

    const userId = decoded.id;
    return this.http.get<AuthInterface>(`${this.API_URL}/auth/me/${userId}`).pipe(
      map(response => { return response })
    );
  }

  setToken(access_token: string): void {
    localStorage.setItem('access_token', access_token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
