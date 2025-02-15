import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SharedService } from '../shared.service';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }
  

  private authUrl: string;
  private currentUserSubject: BehaviorSubject<Response>;
  public currentUser: Observable<Response>;

  constructor(private sharedService: SharedService,private http: HttpClient) {
    this.authUrl = this.sharedService.APIUrl + '/Usuarios';
    this.currentUserSubject = new BehaviorSubject<Response>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): Response {
    return this.currentUserSubject.value;
  }

  public getCurrentUser(): Observable<Response> {
    return this.currentUser;
  }

  login2(email: string, password: string) {
    // Miramos el que nos devuelve el servidor
    return this.http.post<any>(this.authUrl + '/login', { email, password })
      .pipe(map(user => {
        console.log(user);
        if (user && user.token) {
          localStorage.setItem('access_token', user.token);
          this.currentUserSubject.next(user);
        }
        return user;
      }
      ));
  }


  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
  
  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }
}