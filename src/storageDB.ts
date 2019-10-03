export const storageDB = {
	get: (key) => {
		var state = localStorage.getItem(key);
		return (state && JSON.parse(state)) || [];
	},
	set: (key, value) => {
		return localStorage.setItem(key, JSON.stringify(value));
	}
}