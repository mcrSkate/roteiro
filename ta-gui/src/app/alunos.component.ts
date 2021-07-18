import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

  @Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })
 export class AlunosComponent implements OnInit {

    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    duplicado: boolean = false;
    inexistente: boolean = false;

    constructor(private alunoService: AlunoService) {}

     criarAluno(a: Aluno): void {
       this.alunoService.criar(a)
              .subscribe(
                ar => {
                  if (ar) {
                    this.alunos.push(ar);
                    this.aluno = new Aluno();
                  } else {
                    this.duplicado = true;
                  } 
                },
                msg => { alert(msg.message); }
              );
    } 

    removerAluno(cpf: string){
      this.alunoService.remover(cpf)
              .subscribe(
                ar =>{
                    var index = this.alunos.findIndex(a => a.cpf = cpf);
                    if(index != -1){
                      this.alunos.splice(index,1);
                    }
                },
                msg => { alert(msg.message); }
              );



    }


    onMove(): void {
       this.duplicado = false;
    }

     ngOnInit(): void {
       this.alunoService.getAlunos()
             .subscribe(
               as => { this.alunos = as; },
               msg => { alert(msg.message); }
              );
     }

  }