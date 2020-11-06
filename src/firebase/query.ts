import firebase from 'firebase';
import {db} from './firebase';

type Document = firebase.firestore.DocumentData | undefined;

const getTitles = (type: string) => {
	const result: firebase.firestore.DocumentData[] = [];
	db.collection(type).get().then(qs => {
		qs.forEach((doc) => {
			result.push(doc.data().title);
		});
	});

	return result;
};

const getContent = (type: string, id: string) => {
	let result: Document[] = [];
	db
		.collection(type)
		.doc(id)
		.get()
		.then(doc => {
			if (doc.exists) {
				result.push(doc.data());
			} else {
				console.log('No such document');
			}
		}).catch(error => {
		console.error(error)
	});

	return result;
}

export {
	getTitles,
	getContent,
}
