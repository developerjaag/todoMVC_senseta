import * as fromTodo from './todo.actions';
import { Todo } from '../../models/todo.model';


// temporal ojo quitar
const todo1 = new Todo('Publicar');
const todo2 = new Todo('Leer');
const todo3 = new Todo('Aprender');

todo2.done = true;

const initialState: Todo[] = [todo1, todo2, todo3];

export function todoReducer( state = initialState, action: fromTodo.Actions ): Todo[] {

    switch (action.type) {
        // add new todo
        case fromTodo.ADD_TODO:
            const todo = new Todo(action.text);
            return [ ...state, todo ];
        // check one todo
        case fromTodo.CHECK_TODO:
            return state.map( todoDone => {
                if ( todoDone.id === action.id ) {
                    return {
                        ...todoDone, done: !todoDone.done
                    };
                } else {
                    return todoDone;
                }// end else
            });
        // check all todos
        case fromTodo.CHECK_ALL_TODO:
            return state.map( todoDone => {
                return { ...todoDone, done: action.done };
            });
        // edit todo
        case fromTodo.EDIT_TODO:
            return state.map( todoEdit => {
                if ( todo.id === action.id ) {
                    return {
                        ...todoEdit, text: action.text
                    };
                } else {
                    return todoEdit;
                }
            });
        // delete one todo
        case fromTodo.DELETE_TODO:
            return state.filter( todoDelete => todoDelete.id !== action.id );
        // delete all todos
        case fromTodo.DELETE_ALL_TODO:
            return state.filter( todoDelete => !todoDelete.done );

        default:
            return state;

    }// end switch

}
