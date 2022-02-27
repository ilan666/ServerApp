import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component'
import { CoreModule } from './modules/core.module';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MembersModule } from './modules/members.module';
import { SharedModuleModule } from './modules/shared-module.module';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { PhotoEditorComponent } from './member-edit/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { DateInputComponent } from './forms/date-input/date-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    MemberEditComponent,
    ServerErrorComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent
  ],
  imports: [
    SharedModuleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
