import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';

import { TodoDataService } from '../../../services/todo-data.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('textInputBox') textInputBox: ElementRef;

  textInput: FormControl;

  itemActive = false;

  editing: boolean;

  constructor( private _dataService: TodoDataService, private store: Store<AppState> ) { }

  ngOnInit() {
    this.textInput = new FormControl( this.todo.text, Validators.required );
  }// end ngOnInit

  // to edit text of todo
  adit() {
    this.editing = true;
    setTimeout( () => {
      this.textInputBox.nativeElement.select();
    }, 1);

  }// end edit

  // change checkbox
  checkUncheck() {
    const newTodo = new Todo(this.todo);
    this._dataService.updateTodo(newTodo);
  }// end checkUncheck

  // to finish edit text of todo
  finishEdit() {
    this.editing = false;
    // if no valid text just retorn
    if ( this.textInput.invalid ) {
      return;
    }// en if

    this.todo.text = this.textInput.value;
    const newTodo = new Todo(this.todo);
    this._dataService.updateTodo(newTodo);
  }// end finishEdit

  // delete one todo
  deleteTodo() {
    const newTodo = new Todo(this.todo);
    this._dataService.deleteTodo(newTodo);
  }// end deleteTodo

  // when cursor is inside of item
  mouseHovering() {
    this.itemActive = true;
  }// end mouseHovering

  // when cursor is out of item
  mouseLeaving() {
    this.itemActive = false;
  }// end mouseLeaving

}// end class
