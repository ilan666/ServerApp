import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toats-bottom-right'
    })
  ],
  exports: [
    ToastrModule
  ]
})
export class SharedModuleModule { }
