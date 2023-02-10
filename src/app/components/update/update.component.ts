import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  todo: Todo = {
    titulo:'',
    descricao:'',
    dataParaFinalizar:new Date(),
    finalizado:false
  }

  constructor(private router: Router, private service:TodoService,
    private route: ActivatedRoute){

  }
  ngOnInit():void{
    this.todo.id = this.route.snapshot.paramMap.get("id")!;//sempre que iniciar pega o id do path da url e atribui ao id do todo
    this.findById();
  }

  findById():void{
    this.service.findById(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update():void{
    this.service.update(this.todo).subscribe((respota) => {
      this.service.message("Informações atualizadas com sucesso!");
      this.router.navigate(['']);
    }, error => {
      this.service.message("Falha ao atualizar to-do!");
      this.router.navigate(['']);
    });
  }

  cancel():void{
    this.router.navigate(['']);
  }

  formataData():void{
    let data = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }


}
