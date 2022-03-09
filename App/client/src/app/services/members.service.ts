import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Member } from '../models/member';
import { environment } from 'src/environments/environment';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

baseURL = environment.apiURL
members: Member[] = [];

constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>>{

    let params = this.getPaginationHeaders(userParams);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);

    return this.getPaginatedResult<Member[]>(this.baseURL + "users", params)
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

  setMainPhoto(photoID: number): Observable<any>{
    return this.http.put(this.baseURL + "users/set-main-photo/" + photoID, {})
  }

  deletePhoto(photoID: number): Observable<any>{
    return this.http.delete(this.baseURL + "users/delete-photo/" + photoID)
  }

  private getPaginationHeaders({pageSize, pageNumber}: UserParams){
    let params = new HttpParams()
    params = params.append('pageSize', pageSize.toString())
    params = params.append('pageNumber', pageNumber.toString())
    return params
  }

  private getPaginatedResult<T>(url:string, params: HttpParams): Observable<PaginatedResult<T>>
  {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(
      url,
      {
        observe: 'response',
        params
      })
    .pipe(
      map((res: HttpResponse<T>) => {paginatedResult.result = res.body as T;
        if (res.headers.get('Pagination') !== null)
        {
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
        }
        return paginatedResult;
      }));
    }
}
