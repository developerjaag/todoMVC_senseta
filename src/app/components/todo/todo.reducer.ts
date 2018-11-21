import * as fromTodo from './todo.actions';
import { Todo } from '../../models/todo.model';


export interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: []
};

export function todoReducer( state = initialState, action: fromTodo.Actions ): TodosState {

    switch (action.type) {

        // set todos
        case fromTodo.SET_TODOS:
            return {
                todos: [
                    ...action.todos.map( todo => {
                        return {
                            ...todo
                        };
                    })
                ]
            };

        // unset todos
        case fromTodo.UNSET_TODOS:
            return {
                todos: []
            };


        default:
            return state;

    }// end switch

}
