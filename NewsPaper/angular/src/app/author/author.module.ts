import { NgModule } from '@angular/core';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { SharedModule } from '../shared/shared.module';
import { PageModule } from '@abp/ng.components/page';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    AuthorRoutingModule,
    SharedModule,
    PageModule,
    NgbDatepickerModule
  ]
})
export class AuthorModule { }
