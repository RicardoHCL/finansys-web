import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class = "text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() { }

  public get errorMessage(): string | null {

    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    }
    return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return "Campo obrigatório"
    }
    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `O campo deve ter pelo menos ${requiredLength} caracteres`
    }
    else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `O campo deve ter no maxímo ${requiredLength} caracter`
    }
    else if (this.formControl.errors.email) {
      return "Formato de email inválido"
    }
  }

}
