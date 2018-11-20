export class Todo {

     uid?: string;
     text: string;
     done: boolean;

    constructor( object ) {

        this.text = object &&  object.text.charAt(0).toUpperCase() + object.text.slice(1) || null;
        this.done = object && object.done || false;
         if ( object.uid  ) { this.uid = object.uid; }
    }
}
