import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    ToastrModule,
    TabsModule,
    BsDropdownModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    BsDatepickerModule
  ]
})
export class SharedModuleModule { }
