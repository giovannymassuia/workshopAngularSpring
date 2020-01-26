import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';

import { MessageService } from "primeng/api";

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {

  oportunidade = {}
  oportunidades = []
  /*
  oportunidades = [
    {
      "nomeProspecto": "João da Silva",
      "descricao": "Projeto de CRM em Java",
      "valor": 190000.00
    },
    {
      "nomeProspecto": "José Pereira",
      "descricao": "Projeto de Callcenter",
      "valor": 80000.00
    }
  ]
  */

  constructor(
    private oportunidadeService: OportunidadeService,
    private messageService: MessageService,
    ) { }

  ngOnInit() {
    this.consultar()
  }

  consultar() {
    this.oportunidadeService.listar()
      .subscribe(response => this.oportunidades = <any>response)
  }

  adicionar() {
    this.oportunidadeService.adicionar(this.oportunidade)
      .subscribe(() => {
        this.oportunidade = {}
        this.consultar()

        this.messageService.add({
          severity: 'success',
          summary: 'Oportunidade adicionada com sucesso!',
        })
      },
      error => {
        let msg = 'Erro inesperado. Tente Novamente'

        if(error.error.message) {
          msg = error.error.message
        }

        this.messageService.add({
          severity: 'error',
          summary: msg,
        })
      })
  }

}
