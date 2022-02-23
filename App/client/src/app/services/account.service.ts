import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL = environment.apiURL
  private currentUserSource$ = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource$.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseURL + "account/login", model)
    .pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.SetCurrentUser(user)
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUserSource$.next(null)
  }

  SetCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSource$.next(user)
  }

  register(model:any){
    return this.http.post<User>(this.baseURL + "account/register", model)
    .pipe(
      map((user: User) => {
        if(user){
          this.SetCurrentUser(user)
        }
        return user;
      })
    )
  }
}
