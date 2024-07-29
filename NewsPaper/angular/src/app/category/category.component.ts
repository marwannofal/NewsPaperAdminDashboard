import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryDto } from '@proxy'; // ensure the correct import path
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared'; // add new imports

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ListService],
})
export class CategoryComponent implements OnInit {
  category = { items: [], totalCount: 0 } as PagedResultDto<CategoryDto>;
  form: FormGroup;
  isModalOpen = false;
  selectedCategory = {} as CategoryDto;

  constructor(
    public readonly list: ListService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const categoryStreamCreator = (query) => this.categoryService.getList(query);

    this.list.hookToQuery(categoryStreamCreator).subscribe((response) => {
      this.category = response;
    });
  }

  createCategory() {
    this.selectedCategory = {} as CategoryDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editCategory(id: string) {
    this.categoryService.get(id).subscribe((category) => {
      this.selectedCategory = category;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedCategory.name || '', Validators.required],
      description: [this.selectedCategory.description || '', Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedCategory.id
      ? this.categoryService.update(this.selectedCategory.id, this.form.value)
      : this.categoryService.create(this.form.value);

    request.subscribe({
      next: () => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      },
      error: (error) => {
        if (error.error && error.error.message === 'DuplicateCategoryName') {
          this.form.get('name').setErrors({ duplicate: true });
        } else {
          alert(error.error.message || 'An error occurred. Please try again.');
        }
      }
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.categoryService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
