import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }
  private currentUserSource$ = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource$.asObservable();

  login(model:any){
    return this.http.post<User>(this.baseURL + "account/login", model)
    .pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource$.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUserSource$.next(null)
  }

  SetCurrentUser(user: User){
    this.currentUserSource$.next(user)
  }

  register(model:any){
    return this.http.post<User>(this.baseURL + "account/register", model)
    .pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource$.next(user)
        }
        return user;
      })
    )
  }
}
