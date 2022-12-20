import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generalActions } from '../store/store';

const useLoader = () => {
	const [isInitialLoaded, setInitialLoaded] = useState(false); // used only by App.jsx until routes have rendered
	const [loaded, setLoaded] = useState(true);

	const dispatch = useDispatch();

	const stopLoading = () => {
		setLoaded(true);

		setTimeout(() => dispatch(generalActions.fadeLoader()), 200);
		setTimeout(() => dispatch(generalActions.hideLoader()), 400);

		if (!isInitialLoaded) setInitialLoaded(true);
	};

	const startLoading = () => {
		setLoaded(false);

		dispatch(generalActions.startLoader());
	};

	return {
		startLoading,
		stopLoading,
		loaded,
		isInitialLoaded,
	};
};

export default useLoader;
