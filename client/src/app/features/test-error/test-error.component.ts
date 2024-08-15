import { Component, inject } from '@angular/core';
import { ErrorService } from '../../core/error.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss',
})
export class TestErrorComponent {
  private errorService = inject(ErrorService);

  get404Error() {
    this.errorService.get404Error().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get400Error() {
    this.errorService.get400Error().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get401Error() {
    this.errorService.get401Error().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  get500Error() {
    this.errorService.get500Error().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  getValidationError() {
    this.errorService.getValidationError().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }
}
