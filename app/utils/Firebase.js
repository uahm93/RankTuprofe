import firebase from 'firebase/app';
const firebaseConfig = {
	apiKey: 'AIzaSyAnYRZrPtBLQxa_-iWMhNO314m9cqFw7js',
	authDomain: 'rancktuprofe.firebaseapp.com',
	databaseURL: 'https://rancktuprofe.firebaseio.com',
	projectId: 'rancktuprofe',
	storageBucket: 'rancktuprofe.appspot.com',
	messagingSenderId: '122072280430',
	appId: '1:122072280430:web:bc554cb180e7ea3c'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
