import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { EditionService, EditionDto } from '@proxy';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss'],
  providers: [ListService],
})
export class EditionComponent implements OnInit {
  editions = { items: [], totalCount: 0 } as PagedResultDto<EditionDto>;
  form: FormGroup;
  isModalOpen = false;
  selectedEdition = {} as EditionDto;

  constructor(
    public readonly list: ListService,
    private editionService: EditionService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const editionStreamCreator = (query) => this.editionService.getList(query);

    this.list.hookToQuery(editionStreamCreator).subscribe((response) => {
      this.editions = response;
    });
  }

  createEdition() {
    this.selectedEdition = {} as EditionDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editEdition(id: string) {
    this.editionService.get(id).subscribe((edition) => {
      this.selectedEdition = edition;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedEdition.name || '', Validators.required],
      publicationDate: [
        this.selectedEdition.publicationDate ? new Date(this.selectedEdition.publicationDate) : null,
        Validators.required,
      ],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedEdition.id
      ? this.editionService.update(this.selectedEdition.id, this.form.value)
      : this.editionService.create(this.form.value);

    request.subscribe({
      next: () => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      },
      error: (error) => {
        if (error.error && error.error.message === 'DuplicateEditionName') {
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
        this.editionService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
