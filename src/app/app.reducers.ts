import { ActionReducerMap } from '@ngrx/store';

import * as fromTodo from './components/todo/todo.reducer';
import * as fromFilter from './components/todo/filter/filter.reducer';
import * as fromAuth from './components/auth/auth.reducer';
import * as fromUI from './shared/ui.reducer';

import * as fromFilterActions from './components/todo/filter/filter.actions';


export interface AppState {
    todos:  fromTodo.TodosState;
    filter: fromFilterActions.validFilters;
    auth: fromAuth.AuthState;
    ui: fromUI.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filter: fromFilter.filterReducer,
    auth: fromAuth.authReducer,
    ui: fromUI.uiReducer
};
