import {Action} from '@ngrx/store';
import {Todo} from '../../models/todo.model';


export const SET_TODOS = '[TODO] Set todos';
export const UNSET_TODOS = '[TODO] Unset todos';

export class SetTodosAction implements Action {
    readonly type = SET_TODOS;
    constructor( public todos: Todo[] ) {}
}

export class UnsetTodosAction implements Action {
    readonly type = UNSET_TODOS;
}

export type Actions = SetTodosAction |
                        UnsetTodosAction;

