import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-principal',
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {

  // Controla a visibilidade dos botões
  btnCadastro: boolean = true;

  // Objeto usado no formulário
  cliente: Cliente = new Cliente();

  // Lista de clientes exibida na tela | Vetor - Json com dados retornados da API
  clientes: Cliente[] = [];

  // Índice do cliente selecionado
  indice: number = -1;

  // Injeta o service responsável pelas chamadas HTTP
  constructor(private servico: ClienteService) { }


  // Busca os clientes na API
  selecionas(): void {
    this.servico.selecionar().subscribe({
      next: (retorno: Cliente[]) => {
        console.log('Clientes recebidos da API:', retorno);
        this.clientes = retorno;
      },
      error: (erro) => {
        console.error('Erro ao buscar clientes:', erro);
      }
    });
  }

  //  Método de cadastro
  cadastrar(): void {
    this.servico.cadastrar(this.cliente)
      .subscribe(retorno => { this.clientes.push(retorno); });
  }

  //  Metodo de inicialização
  ngOnInit() {
    this.selecionas();
  }

  // Cadastra um cliente localmente na lista
  /*cadastrar(): void {
    this.clientes.push(this.cliente);
  
    console.log('Lista de clientes:', this.clientes);
    console.log('Cliente cadastrado:', this.cliente);
  
    // Limpa o formulário
    this.cliente = new Cliente();
  }*/





}