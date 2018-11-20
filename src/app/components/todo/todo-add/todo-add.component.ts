import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';

import * as fromTodo from '../todo.actions';

import { TodoDataService } from '../../../services/todo-data.service';
import { Todo } from '../../../models/todo.model';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  textInput: FormControl;
  doneAll =  false;


  constructor( private _dataService: TodoDataService, private store: Store<AppState>  ) { }

  ngOnInit() {
    this.textInput = new FormControl('', Validators.required);
  }

  // check/uncheck all
  checkAll() {

    this.doneAll = !this.doneAll;
    this._dataService.checkAll(this.doneAll);


  }// end checkAll

  // add new todo
  addTodo() {

    // if input dont have content
    if ( this.textInput.invalid ) {
      return;
    }

    // new action to add a new todo on setore
    const newTodo = new Todo({ text: this.textInput.value, done: false});
    this._dataService.addTodo(newTodo);

    /*
    const action = new fromTodo.AddTodoAction( this.textInput.value );
    this.store.dispatch( action );
    */

    // clear input box
    this.textInput.setValue('');

  }// end addTodo

}// end class
