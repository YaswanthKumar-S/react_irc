import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);

	// realtime data for document
	useEffect(() => {
		const ref = projectFirestore.collection(collection).doc(id);

		const unsub = ref.onSnapshot(
			(snapshot) => {
				if (snapshot.data()) {
					setDocument({ ...snapshot.data(), id: snapshot.id });
					setError(null);
				} else {
					setError("The document you're trying to fetch doesn't exist");
				}
			},
			(err) => {
				console.log(err.message);
				setError('failed to fetch document');
			}
		);

		return () => unsub();
	}, [collection, id]);

	return { document, error };
};
