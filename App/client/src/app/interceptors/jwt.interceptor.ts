import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService : AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User ={token:'', username: '', photoUrl: ''}

    this.accountService.currentUser$.pipe(take(1)).subscribe((user: User | null) => {if(user) currentUser = user})

    if(currentUser.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request);
  }
}
