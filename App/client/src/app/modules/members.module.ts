import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from './shared-module.module';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

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
    MemberDetailsComponent,
    MemberCardComponent
  ],
  exports: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberCardComponent,
    RouterModule
  ]
})
export class MembersModule { }
