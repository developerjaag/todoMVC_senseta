import { Todo } from './models/todo.model';
import { ActionReducerMap } from '@ngrx/store';

import * as fromTodo from './components/todo/todo.reducer';
import * as fromFilter from './components/todo/filter/filter.reducer';
import * as fromAuth from './components/auth/auth.reducer';

import * as fromFilterActions from './components/todo/filter/filter.actions';


export interface AppState {
    todos:  fromTodo.TodosState;
    filter: fromFilterActions.validFilters;
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filter: fromFilter.filterReducer,
    auth: fromAuth.authReducer
};
