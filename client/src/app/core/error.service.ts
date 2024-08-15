import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);

  get404Error() {
    return this.http.get(this.baseUrl + 'buggy/notfound');
  }

  get400Error() {
    return this.http.get(this.baseUrl + 'buggy/badrequest');
  }

  get401Error() {
    return this.http.get(this.baseUrl + 'buggy/unauthorized');
  }

  get500Error() {
    return this.http.get(this.baseUrl + 'buggy/internalerror');
  }

  getValidationError() {
    return this.http.post(this.baseUrl + 'buggy/validationerror', {});
  }
}
