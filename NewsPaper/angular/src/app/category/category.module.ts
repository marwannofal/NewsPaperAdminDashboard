import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../shared/shared.module';
import { PageModule } from '@abp/ng.components/page';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CategoryRoutingModule,
    SharedModule,
    PageModule,
    NgbDatepickerModule
  ]
})
export class CategoryModule { }
