import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { EditionService, EditionDto } from '@proxy'; // ensure correct import path
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared'; // add new imports

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss'],
  providers: [ListService],
})
export class EditionComponent implements OnInit {
  editions = { items: [], totalCount: 0 } as PagedResultDto<EditionDto>;

  form: FormGroup; // add this line
  isModalOpen = false;
  selectedEdition = {} as EditionDto; // declare selectedEdition

  constructor(
    public readonly list: ListService,
    private editionService: EditionService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService // inject the ConfirmationService
  ) {}

  ngOnInit() {
    const editionStreamCreator = (query) => this.editionService.getList(query);

    this.list.hookToQuery(editionStreamCreator).subscribe((response) => {
      this.editions = response;
    });
  }

  createEdition() {
    this.selectedEdition = {} as EditionDto; // reset the selected edition
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

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  // Add delete method
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.editionService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
