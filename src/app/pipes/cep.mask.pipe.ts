import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask'
})
export class CepMaskPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    if (value == null) return '';
    const cepStr = value.toString().padStart(8, '0');
    return cepStr.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
}