import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { environment } from 'src/environments/environment';
import { Observable, of, tap } from 'rxjs';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

baseURL = environment.apiURL
members: Member[] = [];

constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]>{
    if(this.members.length){
      return of(this.members)
    }
    return this.http.get<Member[]>(this.baseURL + "users")
    .pipe(
      tap(members => this.members = members)
    )
  }

  getMember(username: string): Observable<Member>{
    const member = this.members.find(x => x.userName == username)

    if(member){
      return of(member)
    }

    return this.http.get<Member>(this.baseURL + "users/" + username)
  }

  updateMember(member: Member){
    return this.http.put(this.baseURL + "users", member).pipe(
      tap(() => {
        const index = this.members.findIndex(x => x.id == member.id);
        this.members[index] = member
      })
    )
  }
}
