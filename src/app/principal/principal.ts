import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-principal',
  imports: [
    // FormsModule permite usar [(ngModel)] no HTML
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './principal.html',
  styleUrl: './principal.css',

})
export class Principal {
  //  Variavel para visibilidade de botoes
  btnCadastro: boolean = true;

  // Model: objeto que representa os dados do formulário
  cliente = {
    nome: '',
    idade: null as number | null,
    cidade: ''
  };

  // Model: lista de clientes (simula banco)
  clientes: any[] = [];

  // Índice do cliente selecionado
  indice: number = -1;

  // Controller: função chamada ao clicar no botão
  cadastrar(): void {
    // Adiciona o cliente na lista
    this.clientes.push({ ...this.cliente });

    console.log('Lista de clientes:', this.clientes);

    // Exibe o objeto completo no console
    console.log('Cliente cadastrado: ', this.cliente);

    // Limpa o formulário (boa prática)
    this.cliente = {
      nome: '',
      idade: null,
      cidade: ''
    };



  }
  // Controller: selecionar cliente da tabela
  selecionar(indice: number): void {
    this.indice = indice;

    // Preenche o formulário com os dados
    this.cliente = this.clientes[indice];

    // Controla visibilidade dos botões
    this.btnCadastro = false;
  }
}


