var getTodos = async () => {
    const response = await fetch('http://localhost:3000/todos')
    return response.json()
}

var getTodo = async (id) => {
    const response = await fetch('http://localhost:3000/todos/' + id)
    return response.json()
}

var createTodo = async (data) => {
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: data
    })
    return response.json()
}

var deleteTodo = async (id) => {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    })
    return response.json()
}

var updateTodo = async (id, data) => {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'PUT',
        body: data
    })
    return response.json()
}