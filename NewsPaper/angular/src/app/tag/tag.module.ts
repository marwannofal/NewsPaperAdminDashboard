import { NgModule } from '@angular/core';
import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { PageModule } from '@abp/ng.components/page';



@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    SharedModule,
    TagRoutingModule,
    NgbDatepickerModule,
    PageModule
  ]
})
export class TagModule { }
