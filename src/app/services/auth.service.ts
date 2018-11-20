import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { SetUserAction } from '../components/auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private user: User;


  constructor( public afAuth: AngularFireAuth,
    private afs: AngularFirestore, private store: Store<AppState>) { }


  // init lister for user data
  ionitAuthListener() {

    const me = this;
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      if ( fbUser ) {

        this.userSubscription = this.afs.doc('Users/' + fbUser.uid).valueChanges().subscribe( (userObject: any) => {
          const newUser = new User( userObject );
          this.store.dispatch( new SetUserAction( newUser ) );
          this.user = newUser;
        });
        console.log('aquiiii');
      } else {
        this.user = null;
        this.userSubscription.unsubscribe();
        console.log('Nooooo');
      }

    });

  }// end ionitAuthListener

  // login anonymus user
  loginAnonymus() {
    this.afAuth.auth.signInAnonymously().then( data => {
      // verify structure for this user on onfirestore
      this.verifyStructureDB(data.user.uid);
    }).catch( err => {
      console.error(err);
    });
  }// end loginAnonymus

  // verify structure on firestore
  private verifyStructureDB(uid) {
    const me = this;
    // first verify if structure exist
    const userRef = this.afs.firestore.collection('Users').doc(uid);
    userRef.get().then(function(doc) {
      if (!doc.exists) { // user no exist on database
          me.creteStructureDB(uid);
      } else {
        me.ionitAuthListener();
      }
    });

  }// end verifyStructureDB

  // create structure on firestore of user
  private creteStructureDB(uid) {
    const me = this;
    this.afs.collection('Users').doc(uid).set({
      uid: uid,
      origin: 'TODOMVC',
      createAt: new Date()
    }).then( () => {
      // init listener for user data
      me.ionitAuthListener();
    });
  }// end creteStructureDB

  // get the  user auth
  public getUser() {
    return  { ...this.user};
  }// end getUser

}// end class
