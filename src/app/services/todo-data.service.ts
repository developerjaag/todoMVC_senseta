import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';

import { Todo } from '../models/todo.model';

import { Store } from '@ngrx/store';
import { SetTodosAction, UnsetTodosAction } from '../components/todo/todo.actions';
import { AppState } from '../app.reducers';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EnableLoadignAction, DisableLoadingAction } from '../shared/ui.actions';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  todosListenerSubscription: Subscription = new Subscription();

  constructor(private afs: AngularFirestore, private _authService: AuthService, private store: Store<AppState>) { }

  // initi listener for todos from DB
  initTodosListener() {

    this.todosListenerSubscription = this.store.select('auth').pipe( filter( auth => auth.user != null ) )
                                                              .subscribe( auth => this.getTodos(auth.user.uid) );

  }// end initTodosListener

  // get todos
  getTodos( userUid: string) {

    this.store.dispatch( new EnableLoadignAction() );

    const todosRef = this.afs.collection('Users/' + userUid + '/Todos');
    todosRef.snapshotChanges().pipe(
      map( docData => {
          return docData.map ( doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
      })
    ).subscribe( (collection: any[]) => {
      this.store.dispatch( new SetTodosAction(collection) );
      this.store.dispatch( new DisableLoadingAction );
    });


  }// end getTodos

  // add todo
  addTodo( todo: Todo ) {
    this.afs.firestore.collection('Users/' + this._authService.getUser().uid + '/Todos').add({
      ...todo
    });
  }// end addTodo

  // update todo
  updateTodo( todo: Todo ) {
    this.afs.firestore.collection('Users/' + this._authService.getUser().uid  + '/Todos').doc(todo.uid).set({
      ...todo
    });
  }// end updateTodo

  // check all todos
  checkAll( done: boolean ) {

    const me = this;
    this.afs.firestore.collection('Users/' + this._authService.getUser().uid  + '/Todos').where('done', '==', !done).get()
                                                                  .then(function(querySnapshot) {
                                                                    querySnapshot.forEach(function(doc) {
                                                                        const data = doc.data();
                                                                        const todo: Todo = {uid: doc.id, text: data.text, done: done};
                                                                        me.updateTodo(todo);
                                                                    });
                                                                })
                                                                .catch(function(error) {
                                                                    console.log('Error getting documents: ', error);
                                                                });

  }// end checkAll


  // delete todo
  deleteTodo( todo: Todo ) {
     this.afs.firestore.collection('Users/' + this._authService.getUser().uid  + '/Todos').doc(todo.uid).delete();
  }// end deleteTodo

  // delete todos completed
  deleteTodosCompleted() {

    const me = this;
    this.afs.firestore.collection('Users/' + this._authService.getUser().uid  + '/Todos').where('done', '==', true).get()
                                                                  .then(function(querySnapshot) {
                                                                    querySnapshot.forEach(function(doc) {
                                                                        const data = doc.data();
                                                                        const todo: Todo = {uid: doc.id, text: data.text, done: data.done};
                                                                        me.deleteTodo(todo);
                                                                    });
                                                                })
                                                                .catch(function(error) {
                                                                    console.log('Error getting documents: ', error);
                                                                });

  }// end deleteTodosCompleted

}// end class
