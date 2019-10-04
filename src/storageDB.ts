export const storageDB = {
	get: (key) => {
		var state = localStorage.getItem(key);
		return (state && JSON.parse(state)) || [];
	},
	set: (value) => {
		return localStorage.setItem('todos-jquery', JSON.stringify(value));
	}
}