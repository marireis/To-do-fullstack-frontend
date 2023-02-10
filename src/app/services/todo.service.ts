import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './../models/todo';
import { environment } from './../../environments/enviroments';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.baseUrl; 

  constructor(private http: HttpClient, private snack:MatSnackBar) { }

  findAll(): Observable<Todo[]>{//faz a requisição para o backend

    return this.http.get<Todo[]>(this.baseUrl);// retorna uma lista de todo

  }

  findById(id:any):Observable<Todo>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Todo>(url);
  }

  update(todo: Todo):Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url,todo);

  }

  delete(id:any):Observable<void>{
    const url = `${this.baseUrl}/${id}`;//juntando url +id do delete do back
    return this.http.delete<void>(url);
  }

  create(todo: Todo):Observable<Todo>{
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  message(msg:String):void{
    this.snack.open(`${msg}`, 'OK',{
      horizontalPosition:'end',
      verticalPosition:'top',
      duration:4000
    })
  }
}
