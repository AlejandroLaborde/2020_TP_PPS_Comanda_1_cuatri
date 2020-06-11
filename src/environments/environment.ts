// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyAm-LjISBlEKc_CPlobCKUM2lky-FJEP3o',
    authDomain: 'lacomanda-pps.firebaseapp.com',
    databaseURL: 'https://lacomanda-pps.firebaseio.com',
    projectId: 'lacomanda-pps',
    storageBucket: 'lacomanda-pps.appspot.com',
    messagingSenderId: '48076322712',
    appId: '1:48076322712:web:9e07ac73135f63883a1ded'
  },
  hostFirebase:'https://lacomanda-pps.firebaseio.com/',
  urlOneSignal: 'https://onesignal.com/api/v1/notifications',
  authorizationPush: 'Basic ZmFiNjExMGUtZTFlYi00MjViLTg5ODItZmRkOTliYWRlZjg4',
  oneSignalAppId: '02d56b36-8217-4866-a871-5334f28c91dd'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
