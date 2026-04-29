import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  imports: [
    // FormsModule permite usar [(ngModel)] no HTML
    FormsModule
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

   // Controller: função chamada ao clicar no botão
   cadastrar(): void{
    // Exibe o objeto completo no console
    console.log('Cliente cadastrado: ', this.cliente);
   }

}


