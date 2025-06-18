import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validadorCep(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;
    if (!raw) return null;

    const cep = raw.toString().replace(/\D/g, '');
    if (cep.length !== 8) {
      return { cepInvalido: true };
    }

    return null;
  };
}