// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ArticleService, AuthorService, CategoryService, EditionService, TagService } from '@proxy'; // Adjust import paths as needed
// import { ArticleDto, CreateAndUpdateArticleDto, TagDto } from '@proxy'; // Adjust import paths as needed
// import { PagedAndSortedResultRequestDto } from '@abp/ng.core';

// @Component({
//   selector: 'app-article',
//   templateUrl: './article.component.html',
//   styleUrls: ['./article.component.scss']
// })
// export class ArticleComponent implements OnInit {
//   articleForm: FormGroup;
//   articles$: Observable<ArticleDto[]>;
//   authors$: Observable<any[]>;
//   categories$: Observable<any[]>;
//   editions$: Observable<any[]>;
//   tags$: Observable<TagDto[]>;
//   selectedTagIds: string[] = [];
//   isDropdownOpen = false;

//   isEditing = false;
//   currentArticleId: string | null = null;
//   articleTotalCount = 0;
//   isModalOpen = false;

//   constructor(
//     private fb: FormBuilder,
//     private articleService: ArticleService,
//     private authorService: AuthorService,
//     private categoryService: CategoryService,
//     private editionService: EditionService,
//     private tagService: TagService
//   ) {}

//   ngOnInit() {
//     this.loadArticles();
//     this.buildForm();
//     this.loadDropdowns();
//   }

//   buildForm() {
//     this.articleForm = this.fb.group({
//       title: ['', [Validators.required, Validators.maxLength(128)]],
//       content: ['', Validators.required],
//       publicationDate: [new Date().toISOString().split('T')[0], Validators.required],
//       authorId: [null, Validators.required],
//       categoryId: [null, Validators.required],
//       versionId: [null, Validators.required],
//       tagIds: [[], Validators.required]
//     });
//   }

//   loadDropdowns() {
//     const requestDto = new PagedAndSortedResultRequestDto();

//     this.authors$ = this.authorService.getList(requestDto).pipe(map(response => response.items));
//     this.categories$ = this.categoryService.getList(requestDto).pipe(map(response => response.items));
//     this.editions$ = this.editionService.getList(requestDto).pipe(map(response => response.items));
//     this.tags$ = this.tagService.getList(requestDto).pipe(map(response => response.items));
//   }

//   loadArticles() {
//     const requestDto = new PagedAndSortedResultRequestDto();
  
//     this.articles$ = this.articleService.getList(requestDto).pipe(
//       map(response => {
//         this.articleTotalCount = response.totalCount;
//         return response.items.map(article => {
//           this.editionService.get(article.versionId).subscribe(edition => {
//             article.editionName = edition.name;
//           });
//           return article;
//         });
//       })
//     );
//   }

//   createArticle() {
//     this.isEditing = false;
//     this.currentArticleId = null;
//     this.articleForm.reset({
//       title: '',
//       content: '',
//       publicationDate: new Date().toISOString().split('T')[0],
//       authorId: null,
//       categoryId: null,
//       versionId: '',
//       tagIds: []
//     });
//     this.selectedTagIds = [];
//     this.isModalOpen = true;
//   }

//   editArticle(id: string) {
//     this.isEditing = true;
//     this.currentArticleId = id;

//     this.articleService.get(id).subscribe(article => {
//       const formValues: CreateAndUpdateArticleDto = {
//         title: article.title,
//         content: article.content,
//         publicationDate: article.publicationDate?.split('T')[0] || '',
//         authorId: article.authorId || '',
//         categoryId: article.categoryId || '',
//         versionId: article.versionId || '',
//         tagIds: article.tagIds || []
//       };

//       this.articleForm.patchValue(formValues);
//       this.selectedTagIds = formValues.tagIds;
//       this.isModalOpen = true;
//     });
//   }

//   onTagChange(tagId: string, event: any) {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       this.selectedTagIds.push(tagId);
//     } else {
//       const index = this.selectedTagIds.indexOf(tagId);
//       if (index > -1) {
//         this.selectedTagIds.splice(index, 1);
//       }
//     }
//     this.articleForm.patchValue({ tagIds: this.selectedTagIds });
//   }

//   save() {
//     if (this.articleForm.invalid) {
//       return;
//     }

//     const article: CreateAndUpdateArticleDto = this.articleForm.value;

//     if (this.isEditing && this.currentArticleId) {
//       this.articleService.update(this.currentArticleId, article).subscribe(() => {
//         this.loadArticles();
//         this.resetForm();
//         this.isModalOpen = false;
//       });
//     } else {
//       this.articleService.create(article).subscribe(() => {
//         this.loadArticles();
//         this.resetForm();
//         this.isModalOpen = false;
//       });
//     }
//   }

//   delete(id: string) {
//     if (confirm('Are you sure you want to delete this article?')) {
//       this.articleService.delete(id).subscribe(() => {
//         this.loadArticles();
//       });
//     }
//   }

//   resetForm() {
//     this.isEditing = false;
//     this.currentArticleId = null;
//     this.articleForm.reset({
//       title: '',
//       content: '',
//       publicationDate: new Date().toISOString().split('T')[0],
//       authorId: null,
//       categoryId: null,
//       versionId: null,
//       tagIds: []
//     });
//     this.selectedTagIds = [];
//   }

//   toggleDropdown(event: Event) {
//     event.stopPropagation();
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }

//   closeDropdown(event: Event) {
//     if (!(event.target as HTMLElement).closest('.dropdown')) {
//       this.isDropdownOpen = false;
//     }
//   }
// }


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
  articles$: Observable<ArticleDto[]>;
  authors$: Observable<any[]>;
  categories$: Observable<any[]>;
  editions$: Observable<any[]>;
  tags$: Observable<TagDto[]>;
  selectedTagIds: string[] = [];
  isDropdownOpen = false;

  isEditing = false;
  currentArticleId: string | null = null;
  articleTotalCount = 0;
  isModalOpen = false;

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
      publicationDate: [new Date().toISOString().split('T')[0], Validators.required],
      authorId: [null, Validators.required],
      categoryId: [null, Validators.required],
      versionId: [null, Validators.required],
      tagIds: [[], Validators.required]
    });
  }

  loadDropdowns() {
    const requestDto = new PagedAndSortedResultRequestDto();

    this.authors$ = this.authorService.getList(requestDto).pipe(map(response => response.items));
    this.categories$ = this.categoryService.getList(requestDto).pipe(map(response => response.items));
    this.editions$ = this.editionService.getList(requestDto).pipe(map(response => response.items));
    this.tags$ = this.tagService.getList(requestDto).pipe(map(response => response.items));
  }

  loadArticles() {
    const requestDto = new PagedAndSortedResultRequestDto();
  
    this.articles$ = this.articleService.getList(requestDto).pipe(
      map(response => {
        this.articleTotalCount = response.totalCount;
        return response.items.map(article => {
          this.editionService.get(article.versionId).subscribe(edition => {
            article.editionName = edition.name;
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
      versionId: '',
      tagIds: []
    });
    this.selectedTagIds = [];
    this.isModalOpen = true;
  }

  editArticle(id: string) {
    this.isEditing = true;
    this.currentArticleId = id;

    this.articleService.get(id).subscribe(article => {
      console.log('Article data from API:', article); // Log the API response

      // Manually map tagNames to tagIds if tagIds are not available
      if (!article.tagIds && article.tagNames) {
        this.tags$.subscribe(tags => {
          article.tagIds = tags.filter(tag => article.tagNames.includes(tag.name)).map(tag => tag.id);
          this.patchFormWithArticleData(article);
        });
      } else {
        this.patchFormWithArticleData(article);
      }
    });
  }

  patchFormWithArticleData(article: ArticleDto) {
    const formValues: CreateAndUpdateArticleDto = {
      title: article.title,
      content: article.content,
      publicationDate: article.publicationDate?.split('T')[0] || '',
      authorId: article.authorId || '',
      categoryId: article.categoryId || '',
      versionId: article.versionId || '',
      tagIds: article.tagIds || []
    };

    console.log('Form values before patching:', formValues);

    this.articleForm.patchValue(formValues);
    this.selectedTagIds = [...formValues.tagIds]; // Spread operator to create a copy

    console.log('Selected tag IDs after patching:', this.selectedTagIds);

    this.isModalOpen = true;
  }

  onTagChange(tagId: string, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedTagIds.push(tagId);
    } else {
      const index = this.selectedTagIds.indexOf(tagId);
      if (index > -1) {
        this.selectedTagIds.splice(index, 1);
      }
    }
    this.articleForm.patchValue({ tagIds: this.selectedTagIds });
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
      versionId: null,
      tagIds: []
    });
    this.selectedTagIds = [];
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}


