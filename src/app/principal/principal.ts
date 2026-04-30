import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente';

import { provideHttpClient } from '@angular/common/http';
export const appConfig = {
  providers: [
    provideHttpClient()
  ]
};

@Component({
  selector: 'app-principal',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {

  // Controla a visibilidade dos botões
  btnCadastro: boolean = true;

  //  Variável para visibilidade da tabela
  tabela: boolean = true;

  // Objeto usado no formulário
  cliente: Cliente = new Cliente();

  // Lista de clientes exibida na tela
  clientes: Cliente[] = [];

  // Índice do cliente selecionado
  indice: number = -1;

  // Injeta o service e o detector de mudanças da tela
  constructor(
    private servico: ClienteService,
    private detectorMudancas: ChangeDetectorRef
  ) { }

  //  Método para selecionar um cliente específico
  selecionarCliente(posicao: number): void {

    //  Selecionar cliente no vetor
    this.cliente = this.clientes[posicao]

    //  Visibilidade dos botoes
    this.btnCadastro = false;

    //  Visibilidade da tabela
    this.tabela = false;
  }

  //  Metodo para editar clientes
  editar(): void {
    this.servico.editar(this.cliente)
      .subscribe(retorno => {

        //  Obter a posicao do cliente
        let posicao = this.clientes.findIndex(
          obj => {
            return obj.codigo == retorno.codigo;
          });

        //  Alterar os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        // Limpa o formulário
        this.cliente = new Cliente();

        //Visibilidade dos botoes
        this.btnCadastro = true;

        //Visibilidade dos botoes
        this.tabela = true;

        alert("Cliente editado com sucesso!");

      });

  }

  //  Metodo para remover clientes
  remover(): void {
    this.servico.remover(this.cliente.codigo)
      .subscribe(retorno => {

        //  Obter a posicao do cliente
        let posicao = this.clientes.findIndex(
          obj => {
            return obj.codigo == this.cliente.codigo;
          });

        //  Remover cliente do vetor
        this.clientes.splice(posicao, 1);

        // Limpa o formulário
        this.cliente = new Cliente();

        //Visibilidade dos botoes
        this.btnCadastro = true;

        //Visibilidade dos botoes
        this.tabela = true;

        alert("Cliente removido com sucesso!");
      });
  }

  //  Metodo para cancelar
  cancelar():void{
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
  }


  // Método executado ao carregar o componente
  ngOnInit(): void {
    this.selecionas();
  }

  // Busca os clientes na API
  selecionas(): void {
    this.servico.selecionar().subscribe({
      next: (retorno: Cliente[]) => {
        console.log('Clientes recebidos da API:', retorno);

        this.clientes = retorno;

        // Força a tela a atualizar a tabela
        this.detectorMudancas.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao buscar clientes:', erro);
      }
    });
  }

  // Cadastra cliente na API
  cadastrar(): void {
    this.servico.cadastrar(this.cliente).subscribe({
      next: (retorno: Cliente) => {
        // Adiciona na tabela
        this.clientes.push(retorno);

        // Limpa o formulário
        this.cliente = new Cliente();

        // Força a tela a atualizar os inputs
        this.detectorMudancas.detectChanges();

        alert('Cliente cadastrado com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
      }
    });
  }
}