import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'orderTodos'
})
export class OrderTodosPipe implements PipeTransform {

  transform(todo: Todo[]): Todo[] {

    todo.sort((a: any, b: any) => {
      if (a.createAt < b.createAt) {
        return -1;
      } else if (a.createAt > b.createAt) {
        return 1;
      } else {
        return 0;
      }
    });
    return todo;
  }

}
