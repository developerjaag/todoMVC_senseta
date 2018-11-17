// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCj_m8OZoQM1Bu2EzFyux2wNEOfPd2FGgE',
    authDomain: 'todomvc-bc108.firebaseapp.com',
    databaseURL: 'https://todomvc-bc108.firebaseio.com',
    projectId: 'todomvc-bc108',
    storageBucket: 'todomvc-bc108.appspot.com',
    messagingSenderId: '428751454427'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
