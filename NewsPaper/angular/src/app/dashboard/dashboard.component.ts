import { Component, OnInit } from '@angular/core';
import { ArticleService, AuthorService, CategoryService, EditionService, TagService } from '@proxy';
import { Observable, combineLatest } from 'rxjs';
import { map  } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  articlesCount$: Observable<number>;
  authorsCount$: Observable<number>;
  categoriesCount$: Observable<number>;
  editionsCount$: Observable<number>;
  tagsCount$: Observable<number>;


  chartData: any;
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private editionService: EditionService,
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.articlesCount$ = this.articleService.getList({ maxResultCount: 10 }).pipe(map(res => res.totalCount));
    this.authorsCount$ = this.authorService.getList({ maxResultCount: 10 }).pipe(map(res => res.totalCount));
    this.categoriesCount$ = this.categoryService.getList({ maxResultCount: 10 }).pipe(map(res => res.totalCount));
    this.editionsCount$ = this.editionService.getList({ maxResultCount: 10 }).pipe(map(res => res.totalCount));
    this.tagsCount$ = this.tagService.getList({ maxResultCount: 10 }).pipe(map(res => res.totalCount));


    combineLatest([this.articlesCount$, this.authorsCount$, this.categoriesCount$, this.tagsCount$, this.editionsCount$])
      .subscribe(([articles, authors, categories, tags, editions]) => {
        this.chartData = {
          labels: ['Articles', 'Authors', 'Categories', 'Tags', 'Editions'],
          datasets: [
            { data: [articles, authors, categories, tags, editions], label: 'Count' }
          ]
        };
      });
  }
}
