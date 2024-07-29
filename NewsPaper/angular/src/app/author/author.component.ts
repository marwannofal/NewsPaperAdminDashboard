import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { AuthorService, AuthorDto } from '@proxy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { AuthService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  providers: [ListService],
})
export class AuthorComponent implements OnInit {
  authors = { items: [], totalCount: 0 } as PagedResultDto<AuthorDto>;
  form: FormGroup;
  isModalOpen = false;
  selectedAuthor = {} as AuthorDto;
  identityUserId: string;

  constructor(
    public readonly list: ListService,
    private authorService: AuthorService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.identityUserId = this.getUserIdFromToken();

    const authorStreamCreator = (query) => this.authorService.getList(query);

    this.list.hookToQuery(authorStreamCreator).subscribe((response) => {
      this.authors = response;
    });

    this.buildForm();
  }

  getUserIdFromToken(): string {
    const token = this.authService.getAccessToken();
    if (!token) return '';

    const decodedToken = this.parseJwt(token);
    return decodedToken.sub;
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  createAuthor() {
    this.selectedAuthor = {} as AuthorDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      userName: ['', [Validators.required], this.userNameValidator.bind(this)],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], this.emailValidator.bind(this)],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });
  }

  userNameValidator(control) {
    return new Promise((resolve) => {
      this.http
        .get<any>(`https://localhost:44347/api/identity/users/by-username/${control.value}`)
        .subscribe(
          (response) => {
            if (response) {
              resolve({ exists: true });
            } else {
              resolve(null);
            }
          },
          () => {
            resolve(null);
          }
        );
    });
  }

  emailValidator(control) {
    return new Promise((resolve) => {
      this.http
        .get<any>(`https://localhost:44347/api/identity/users/by-email/${control.value}`)
        .subscribe(
          (response) => {
            if (response) {
              resolve({ emailExists: true });
            } else {
              resolve(null);
            }
          },
          () => {
            resolve(null);
          }
        );
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const user = {
      userName: this.form.value.userName,
      name: this.form.value.name,
      surname: this.form.value.surname,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.value.password,
      isActive: true,
      lockoutEnabled: true,
      roleNames: [], 
    };

    this.http.post<any>('https://localhost:44347/api/identity/users', user).subscribe(
      (response) => {
        const author = {
          fullName: this.form.value.fullName,
          bio: this.form.value.bio,
          identityUserId: response.id, 
        };

        this.authorService.create(author).subscribe(() => {
          this.isModalOpen = false;
          this.form.reset();
          this.list.get();
        });
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  editAuthor(id: string) {
  this.authorService.get(id).subscribe((author) => {
    if (!author) {
      console.error('Author not found:', id);
      return;
    }
    this.selectedAuthor = author;
    this.buildForm(); // Ensure the form is built

    if (this.form) {
      this.form.patchValue({
        userName: author.userName,
        name: author.firstName,
        surname: author.lastName,
        email: author.email,
        phoneNumber: author.phoneNumber,
        password: '', 
        fullName: author.fullName,
        bio: author.bio,
      });
    } else {
      console.error('Form not initialized');
    }

    this.isModalOpen = true;
  }, error => {
    console.error('Error fetching author:', error);
  });
}

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.authorService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
