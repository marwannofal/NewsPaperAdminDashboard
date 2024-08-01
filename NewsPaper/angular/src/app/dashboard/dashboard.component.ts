import { Component, OnInit } from '@angular/core';
import { ArticleService, AuthorService, CategoryService, EditionService, TagService } from '@proxy';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalizationService } from '@abp/ng.core'; 

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
  articles$: Observable<any[]>; 

  chartData: ChartConfiguration['data'];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  authorsChartData: ChartConfiguration<'bar'>['data'];
  articlesTagsChartData: ChartConfiguration<'bar'>['data'];

  private colorPalette = [
    'rgba(255, 99, 132, 0.2)', // Red
    'rgba(54, 162, 235, 0.2)', // Blue
    'rgba(255, 206, 86, 0.2)', // Yellow
    'rgba(75, 192, 192, 0.2)', // Green
    'rgba(153, 102, 255, 0.2)', // Purple
    'rgba(255, 159, 64, 0.2)'  // Orange
  ];

  private borderColorPalette = [
    'rgba(255, 99, 132, 1)',   // Red
    'rgba(54, 162, 235, 1)',   // Blue
    'rgba(255, 206, 86, 1)',   // Yellow
    'rgba(75, 192, 192, 1)',   // Green
    'rgba(153, 102, 255, 1)',  // Purple
    'rgba(255, 159, 64, 1)'    // Orange
  ];

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private editionService: EditionService,
    private tagService: TagService,
    private localizationService: LocalizationService
  ) {}

  ngOnInit() {
    const query = { maxResultCount: 1000, skipCount: 0 };

    this.articlesCount$ = this.articleService.getList(query).pipe(map(res => res.totalCount));
    this.authorsCount$ = this.authorService.getList(query).pipe(map(res => res.totalCount));
    this.categoriesCount$ = this.categoryService.getList(query).pipe(map(res => res.totalCount));
    this.editionsCount$ = this.editionService.getList(query).pipe(map(res => res.totalCount));
    this.tagsCount$ = this.tagService.getList(query).pipe(map(res => res.totalCount));

    this.articleService.getList(query).pipe(
      map(res => res.items),
      map(articles => {
        const publicationDates = articles.map(article => article.publicationDate.split('T')[0]);
        const dateCounts = this.countByDate(publicationDates);

        this.chartData = {
          labels: Object.keys(dateCounts),
          datasets: [
            {
              label: this.localizationService.instant('::Articles Published'),
              data: Object.values(dateCounts),
              backgroundColor: this.colorPalette,
              borderColor: this.borderColorPalette,
              borderWidth: 1,
            },
          ],
        };
      })
    ).subscribe();

    this.articleService.getList(query).pipe(
      map(response => {
        const articles = response.items;
        const authorNames = Array.from(new Set(articles.map(article => article.authorName)));
        const authorArticleCounts = authorNames.map(name => {
          return articles.filter(article => article.authorName === name).length;
        });

        this.authorsChartData = {
          labels: authorNames,
          datasets: [
            {
              label:this.localizationService.instant('::Articles by Author'),
              data: authorArticleCounts,
              backgroundColor: this.colorPalette,
              borderColor: this.borderColorPalette,
              borderWidth: 1,
            },
          ],
        };
      })
    ).subscribe();

    this.articleService.getList(query).pipe(
      map(response => {
        const articles = response.items;
        const tagCounts = new Map<string, number>();
        articles.forEach(article => {
          article.tagNames.forEach(tag => {
            if (tagCounts.has(tag)) {
              tagCounts.set(tag, tagCounts.get(tag)! + 1);
            } else {
              tagCounts.set(tag, 1);
            }
          });
        });
        const tagNames = Array.from(tagCounts.keys());
        const tagArticleCounts = Array.from(tagCounts.values());

        this.articlesTagsChartData = {
          labels: tagNames,
          datasets: [
            {
              label: this.localizationService.instant('::Number of Articles'),
              data: tagArticleCounts,
              backgroundColor: this.colorPalette.slice(0, tagNames.length),
              borderColor: this.borderColorPalette.slice(0, tagNames.length),
              borderWidth: 1,
            },
          ],
        };
      })
    ).subscribe();

    
    this.articles$ = this.articleService.getList(query).pipe(
      map(response => response.items)
    );
  }
  countByDate(dates: string[]): Record<string, number> {
    return dates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

