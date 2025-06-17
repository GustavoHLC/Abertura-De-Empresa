import { Component, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/model/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('toast') toast!: ToastComponent;
  empresas: Empresa[] = [];
  empresaSelecionada?: Empresa;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe({
      next: (dados) => {
        console.log('Empresas carregadas:', dados);
        this.empresas = dados;
      },
      error: (err) => {
        this.toast.showToast('Erro ao carregar empresas', 'danger')
        console.error(err);
      }
    });
  }


selecionarEmpresa(empresa: Empresa): void {
  this.empresaSelecionada = empresa;

  if (window.innerWidth < 768) {
    const modalElement = document.getElementById('detalhesModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}

}
