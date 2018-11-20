

export class User {

    public uid: string;
    public createAt: Date;
    public origin: string;

    constructor( object: DataObject ) {
        this.uid = object && object.uid || null;
        this.createAt = object && object.createAt || null;
        this.origin = object && object.origin || null;
    }

}// end class

interface DataObject {

    uid: string;
    createAt: Date;
    origin: string;

}// end interface DataObject
