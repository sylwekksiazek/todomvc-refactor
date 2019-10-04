import { TodoDataModel } from './utils';

export const getTodos = async () => {
    const response = await fetch('http://localhost:3000/todos');
    return response.json();
}

export const getTodo = async (id) => {
    const response = await fetch('http://localhost:3000/todos/' + id);
    return response.json();
}

export const createTodo = async (data) => {
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: data
    })
    return response.json();
}

export const deleteTodo = async (id) => {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    });
    return response.json();
}

export const updateTodo = async (id, data) => {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'PUT',
        body: data
    });
    return response.json();
}