import { Component } from '@angular/core';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent {

  listFinished:Todo[]=[];

  constructor(private service: TodoService, private router: Router){}

  ngOnInit(): void {
    this.findAll();//chama o método

  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo =>{
        if(todo.finalizado){
          this.listFinished.push(todo);
        }
      })
    })
  }

  voltar():void{
    this.router.navigate([''])

  }

}
