import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validadorDataNascimentoString() {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor: string = control.value?.trim();

    if (!valor) {
      return { required: true };
    }

    const partes = valor.split('/');
    if (partes.length !== 3) {
      return { dataInvalida: true };
    }

    const [diaStr, mesStr, anoStr] = partes;
    const dia = Number(diaStr);
    const mes = Number(mesStr);
    const ano = Number(anoStr);

    if (
      isNaN(dia) || isNaN(mes) || isNaN(ano) ||
      dia < 1 || mes < 1 || mes > 12 || ano < 1900 || ano > new Date().getFullYear()
    ) {
      return { dataInvalida: true };
    }

    const diasPorMes = [
      31,
      (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    if (dia > diasPorMes[mes - 1]) {
      return { dataInvalida: true };
    }

    const hoje = new Date();
    const aniversario = new Date(ano, mes - 1, dia);
    const idade = hoje.getFullYear() - ano -
      (hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia) ? 1 : 0);

    if (idade < 18) {
      return { menorDeIdade: true };
    }

    return null;
  };
}
