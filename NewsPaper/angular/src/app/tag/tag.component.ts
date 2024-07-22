import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { TagService, TagDto } from '@proxy'; // Ensure the correct import path
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared'; // Add new imports

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  providers: [ListService],
})
export class TagComponent implements OnInit {
  tag = { items: [], totalCount: 0 } as PagedResultDto<TagDto>; // Adjust to TagDto
  form: FormGroup; // Form for handling tag data
  isModalOpen = false; // Control modal visibility
  selectedTag = {} as TagDto; // Selected tag for editing

  constructor(
    public readonly list: ListService,
    private tagService: TagService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService // Inject ConfirmationService
  ) {}

  ngOnInit() {
    const tagStreamCreator = (query) => this.tagService.getList(query);
    this.list.hookToQuery(tagStreamCreator).subscribe((response) => {
      this.tag = response;
    });
  }

  createTag() {
    this.selectedTag = {} as TagDto; // Reset selected tag
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
      name: [this.selectedTag.name || '', Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedTag.id
      ? this.tagService.update(this.selectedTag.id, this.form.value)
      : this.tagService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
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
