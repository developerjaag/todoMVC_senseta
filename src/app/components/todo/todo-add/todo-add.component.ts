import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';

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
  loadingUser = true;


  constructor( private _dataService: TodoDataService, private store: Store<AppState>  ) { }

  ngOnInit() {
    this.textInput = new FormControl('', Validators.required);
    // subscribe to loading state
    this.store.select('ui').subscribe( ui => this.loadingUser = ui.isLoading );
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
    const newTodo = new Todo({ text: this.textInput.value, done: false, createAt: new Date()});
    this._dataService.addTodo(newTodo);

    // clear input box
    this.textInput.setValue('');

  }// end addTodo

}// end class
