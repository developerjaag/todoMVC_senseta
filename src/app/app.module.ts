import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducers';

// angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatListModule, MatCardModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TodoAddComponent } from './components/todo/todo-add/todo-add.component';
import { TodoFooterComponent } from './components/todo/todo-footer/todo-footer.component';
import { TodoItemComponent } from './components/todo/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoAddComponent,
    TodoFooterComponent,
    TodoItemComponent,
    TodoListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatListModule, MatCardModule, MatInputModule, MatToolbarModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
