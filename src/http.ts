import { TodoDataModel } from './utils';

export const getTodos = async () => {
    const response = await fetch('http://localhost:3000/todos');
    return response.json();
}

export const getTodo = async (id) => {
    const response = await fetch('http://localhost:3000/todos/' + id);
    return response.json();
}

// TODO: Fixme :(
export const createTodo = async (data) => {
	console.log(data);
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify(data)
    })
	console.log(response);
    return response.json();
}

export const deleteTodo = async (id) => {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    });
    return response.json();
}

// TODO: Fixme :(
export const updateTodo = async (data) => {
    const response = await fetch('http://localhost:3000/todos/' + data.id, {
        method: 'PUT',
	    body: JSON.stringify(data)
    });
    return response.json();
}

// TODO: Fixme :(
export const updateTodos = async (data) => {
	const response = await fetch('http://localhost:3000/todos', {
		method: 'PUT',
		body: JSON.stringify(data)
	});
	return response.json();
}