import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { TagService, TagDto } from '@proxy';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  providers: [ListService],
})
export class TagComponent implements OnInit {
  tag = { items: [], totalCount: 0 } as PagedResultDto<TagDto>;
  form: FormGroup;
  isModalOpen = false;
  selectedTag = {} as TagDto;

  constructor(
    public readonly list: ListService,
    private tagService: TagService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const tagStreamCreator = (query) => this.tagService.getList(query);
    this.list.hookToQuery(tagStreamCreator).subscribe((response) => {
      this.tag = response;
    });
  }

  createTag() {
    this.selectedTag = {} as TagDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editTag(id: string) {
    this.tagService.get(id).subscribe((tag) => {
      this.selectedTag = tag;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedTag.name || '', [Validators.required]],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
  
    const request = this.selectedTag.id
      ? this.tagService.update(this.selectedTag.id, this.form.value)
      : this.tagService.create(this.form.value);
  
    request.pipe(finalize(() => this.isModalOpen = false)).subscribe({
      next: () => {
        this.form.reset();
        this.list.get();
      },
      error: (error) => {
        if (error.error && error.error.message === 'DuplicateTagName') {
          this.form.get('name').setErrors({ thereIsExist: true });
        } else {
          alert(error.error.message || 'An error occurred. Please try again.');
        }
      }
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.tagService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
