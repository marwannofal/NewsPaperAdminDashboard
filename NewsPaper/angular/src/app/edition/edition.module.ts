import { NgModule } from '@angular/core';
import { EditionRoutingModule } from './edition-routing.module';
import { EditionComponent } from './edition.component';
import { SharedModule } from '../shared/shared.module';
import { PageModule } from '@abp/ng.components/page';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    EditionComponent
  ],
  imports: [
    EditionRoutingModule,
    SharedModule,
    PageModule,
    NgbDatepickerModule
  ]
})
export class EditionModule { }
