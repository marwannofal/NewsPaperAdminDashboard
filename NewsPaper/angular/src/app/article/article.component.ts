import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleService, AuthorService, CategoryService, EditionService, TagService } from '@proxy'; // Adjust import paths as needed
import { ArticleDto, CreateAndUpdateArticleDto, TagDto } from '@proxy'; // Adjust import paths as needed
import { PagedAndSortedResultRequestDto } from '@abp/ng.core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleForm: FormGroup;
  articles$: Observable<ArticleDto[]>; // Observable for articles
  authors$: Observable<any[]>; // Observable for authors
  categories$: Observable<any[]>; // Observable for categories
  editions$: Observable<any[]>; // Observable for editions
  tags$: Observable<TagDto[]>; // Observable for tags

  isEditing = false;
  currentArticleId: string | null = null;
  articleTotalCount = 0; // Track the total count of articles
  isModalOpen = false; // Controls modal visibility

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private editionService: EditionService,
    private tagService: TagService
  ) {}

  ngOnInit() {
    this.loadArticles();
    this.buildForm();
    this.loadDropdowns();
  }

  buildForm() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(128)]],
      content: ['', Validators.required],
      publicationDate: [new Date().toISOString().split('T')[0], Validators.required], // Default to today's date
      authorId: [null, Validators.required],
      categoryId: [null, Validators.required],
      versionId: [null, Validators.required], // Changed from editionId
      tagIds: [[], Validators.required] // Array of tag IDs
    });
  }

  loadDropdowns() {
    const requestDto = new PagedAndSortedResultRequestDto(); // Create an empty request DTO

    this.authors$ = this.authorService.getList(requestDto).pipe(
      map(response => response.items) // Extract items from PagedResultDto
    );
    this.categories$ = this.categoryService.getList(requestDto).pipe(
      map(response => response.items) // Extract items from PagedResultDto
    );
    this.editions$ = this.editionService.getList(requestDto).pipe( // Keeping the service name as editions$
      map(response => response.items) // Extract items from PagedResultDto
    );
    this.tags$ = this.tagService.getList(requestDto).pipe(
      map(response => response.items) // Extract items from PagedResultDto
    );
  }

  loadArticles() {
    const requestDto = new PagedAndSortedResultRequestDto(); // Create an empty request DTO
  
    this.articles$ = this.articleService.getList(requestDto).pipe(
      map(response => {
        this.articleTotalCount = response.totalCount; // Update the total count
        return response.items.map(article => {
          // Fetch the edition name based on the versionId
          this.editionService.get(article.versionId).subscribe(edition => {
            article.editionName = edition.name; // Assuming the edition has a 'name' property
          });
          return article;
        });
      })
    );
  }

  createArticle() {
    this.isEditing = false;
    this.currentArticleId = null;
    this.articleForm.reset({
      title: '',
      content: '',
      publicationDate: new Date().toISOString().split('T')[0],
      authorId: null,
      categoryId: null,
      versionId: '', // Changed from editionId
      tagIds: []
    });
    this.isModalOpen = true;
  }

  editArticle(id: string) {
    this.isEditing = true;
    this.currentArticleId = id;

    this.articleService.get(id).subscribe(article => {
      // Manually map properties from ArticleDto to CreateAndUpdateArticleDto
      const formValues: CreateAndUpdateArticleDto = {
        title: article.title,
        content: article.content,
        publicationDate: article.publicationDate?.split('T')[0] || '',
        authorId: article.authorId || '', // Assuming you fetch this separately
        categoryId: article.categoryId || '', // Assuming you fetch this separately
        versionId: article.versionId, // Assuming you fetch this separately
        tagIds: article.tagIds || [] // Assuming you fetch this separately
      };

      this.articleForm.patchValue(formValues);
      this.isModalOpen = true;
    });
  }

  save() {
    if (this.articleForm.invalid) {
      return;
    }

    const article: CreateAndUpdateArticleDto = this.articleForm.value;

    if (this.isEditing && this.currentArticleId) {
      this.articleService.update(this.currentArticleId, article).subscribe(() => {
        this.loadArticles();
        this.resetForm();
        this.isModalOpen = false;
      });
    } else {
      this.articleService.create(article).subscribe(() => {
        this.loadArticles();
        this.resetForm();
        this.isModalOpen = false;
      });
    }
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.articleService.delete(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentArticleId = null;
    this.articleForm.reset({
      title: '',
      content: '',
      publicationDate: new Date().toISOString().split('T')[0],
      authorId: null,
      categoryId: null,
      versionId: null, // Changed from editionId
      tagIds: []
    });
  }
}
