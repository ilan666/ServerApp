import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

baseURL = environment.apiURL

constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.baseURL + "users")
  }

  getMember(username: string): Observable<Member>{
    return this.http.get<Member>(this.baseURL + "users/" + username)
  }

  updateMember(member: Member){
    return this.http.put(this.baseURL + "users", member)
  }
}
