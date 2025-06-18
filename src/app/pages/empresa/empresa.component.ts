import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Empresa, EntidadeRegistro } from 'src/app/model/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { validadorCep } from 'src/app/shared/validator/validador-cep.validator';
import { validadorDataNascimentoString } from 'src/app/shared/validator/validador-data-nascimento.validator';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent {
  @ViewChild('toast') toast!: ToastComponent;
  empresa: Empresa = {} as Empresa;
  isEdicao = false;
  empresaForm!: FormGroup;
  entidades: EntidadeRegistro[] = [];
  estados: any[] = [];
  mostrarModal = false;
  textoModal = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarEstados();
    this.carregarEntidadesRegistro();
    this.monitorarCep();
    this.verificarModoEdicao();
  }

  private inicializarFormulario(): void {
    this.empresaForm = this.fb.group({
      solicitante: this.fb.group({
        ds_responsavel: ['', Validators.required],
        nu_cpf: ['', Validators.required],
        date_nascimento: ['', [Validators.required, validadorDataNascimentoString()]]
      }),
      empresa: this.fb.group({
        ds_nome_fantasia: ['', Validators.required],
        co_entidade_registro: this.fb.control(null, Validators.required),
        endereco: this.fb.group({
          co_cep: ['', [Validators.required, validadorCep()]],
          ds_logradouro: ['', Validators.required],
          co_numero: [null, Validators.required],
          ds_complemento: [''],
          ds_bairro: ['', Validators.required],
          ds_municipio: ['', Validators.required],
          co_uf: ['', Validators.required]
        })
      })
    });
  }

  private carregarEstados(): void {
    this.empresaService.getEstados().subscribe(estados => this.estados = estados);
  }

  private carregarEntidadesRegistro(): void {
    this.empresaService.getEntidadesRegistro().subscribe((entidades: EntidadeRegistro[]) => {
      this.entidades = entidades;
    });
  }

  private monitorarCep(): void {
    this.empresaForm.get('empresa.endereco.co_cep')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((cep: string) => cep.replace(/\D/g, '')),
        filter(cep => cep.length === 8),
        switchMap(cep => this.empresaService.getEnderecoPorCep(cep))
      )
      .subscribe(endereco => {
        if (endereco.erro) {
          this.toast.showToast('CEP não encontrado');
          return;
        }

        const enderecoForm = this.empresaForm.get('empresa.endereco');
        enderecoForm?.patchValue({
          ds_logradouro: endereco.logradouro,
          ds_bairro: endereco.bairro,
          ds_municipio: endereco.localidade,
        });

        const estadoIBGE = this.estados.find(uf => uf.sigla === endereco.uf);
        if (estadoIBGE) {
          enderecoForm?.patchValue({ co_uf: estadoIBGE.id });
        }
      });
  }

  private verificarModoEdicao(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdicao = true;
      this.carregarEmpresa(+id);
    }
  }

  onEntidadeChange(event: any) {
    const control = this.empresaForm.get('empresa.co_entidade_registro');
    const valor = Number(event.target.value);
    if (event.target.checked) {
      control?.setValue([valor]);
    } else {
      control?.setValue([]);
    }
  }

  carregarEmpresa(id: number): void {
    this.empresaService.getEmpresaById(id).subscribe({
      next: (dados) => {
        console.log('dados:', dados);
        this.empresa = dados;
        const data = dados.solicitante?.date_nascimento;
        if (dados.solicitante && data) {
          const [ano, mes, dia] = data.split('-');
          dados.solicitante.date_nascimento = `${dia}/${mes}/${ano}`;
        }
        const entidadeRegistro = dados.empresa?.co_entidade_registro;
        const entidadesArray = Array.isArray(entidadeRegistro)
          ? entidadeRegistro
          : [entidadeRegistro];
        const cep = dados.empresa?.endereco?.co_cep?.toString().padStart(8, '0');
        const cepFormatado = cep?.replace(/(\d{5})(\d{3})/, '$1-$2');
        this.empresaForm.patchValue({
          solicitante: {
            ds_responsavel: dados.solicitante?.ds_responsavel || '',
            nu_cpf: dados.solicitante?.nu_cpf || '',
            date_nascimento: dados.solicitante?.date_nascimento || ''
          },
          empresa: {
            ds_nome_fantasia: dados.empresa?.ds_nome_fantasia || '',
            co_entidade_registro: entidadesArray,
            endereco: {
              co_cep: cepFormatado,
              ds_logradouro: dados.empresa?.endereco?.ds_logradouro || '',
              co_numero: dados.empresa?.endereco?.co_numero || '',
              ds_complemento: dados.empresa?.endereco?.ds_complemento || '',
              ds_bairro: dados.empresa?.endereco?.ds_bairro || '',
              ds_municipio: dados.empresa?.endereco?.ds_municipio || '',
              co_uf: dados.empresa?.endereco?.co_uf || ''
            }
          }
        });
      },
      error: (err) => this.toast.showToast('Erro ao carregar empresa:', err)
    });
  }

  salvar() {
    if (this.temCamposObrigatoriosNaoPreenchidos()) {
      this.empresaForm.markAllAsTouched();
      this.toast.showToast('Por favor, preencha todos os campos obrigatórios.', 'danger');
      return;
    }
    const rotaId = this.route.snapshot.paramMap.get('id');
    const dados = this.empresaForm.value;
    const data = dados.solicitante.date_nascimento;
    if (data?.includes('/')) {
      const [dia, mes, ano] = data.split('/');
      dados.solicitante.date_nascimento = `${ano}-${mes}-${dia}`;
    }
    if (rotaId) {
      this.empresaService.atualizarEmpresa(+rotaId, dados).subscribe(() => {
        this.textoModal = 'Solicitação atualizada com sucesso';
        this.mostrarModal = true;
      });
    } else {
      this.empresaService.getEmpresas().subscribe(empresas => {
        const ids = empresas.map(e => Number(e.id)).filter(id => !isNaN(id));
        const novoId = (Math.max(...ids, 0) + 1).toString();
        dados.id = novoId;
        this.empresaService.criarEmpresa(dados).subscribe(() => {
          this.textoModal = 'Solicitação cadastrada com sucesso';
          this.mostrarModal = true;
        });
      });
    }
  }

  temCamposObrigatoriosNaoPreenchidos(): boolean {
    const invalidControls: AbstractControl[] = [];
    const findInvalidControls = (control: AbstractControl) => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(findInvalidControls);
      } else if (
        control.errors?.['required'] &&
        (control.value === null || control.value === '' || control.value?.length === 0)
      ) {
        invalidControls.push(control);
      }
    };
    findInvalidControls(this.empresaForm);
    return invalidControls.length > 0;
  }

  fecharModal() {
    this.mostrarModal = false;
  }
}
