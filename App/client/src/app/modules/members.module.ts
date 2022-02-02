import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from './shared-module.module';

const routes: Routes = [
  {path: '', component:MemberListComponent, pathMatch:'full'},
  {path: ':id', component:MemberDetailsComponent,}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModuleModule
  ],
  declarations: [
    MemberListComponent,
    MemberDetailsComponent
  ],
  exports: [
    MemberListComponent,
    MemberDetailsComponent,
    RouterModule
  ]
})
export class MembersModule { }
