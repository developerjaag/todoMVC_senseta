import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';

import * as fromTodo from '../todo.actions';

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

  constructor( private store: Store<AppState> ) { }

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
    this.todo.done = !this.todo.done;
    const action = new fromTodo.CheckTodoAction( this.todo.id );
    this.store.dispatch( action );
  }// end checkUncheck

  // to finish edit text of todo
  finishEdit() {
    this.editing = false;
    // if no valid text just retorn
    if ( this.textInput.invalid ) {
      return;
    }// en if
    const action = new fromTodo.EditTodoAction(this.todo.id, this.textInput.value);
    this.store.dispatch( action );
  }// end finishEdit

  // delete one todo
  deleteTodo() {
    const action = new fromTodo.DeleteTodoAction( this.todo.id );
    this.store.dispatch( action );
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
