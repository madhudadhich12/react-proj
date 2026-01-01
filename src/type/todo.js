export function createTodo(text){
    return{
        id: Date.now().toString(),
        text,
        completed: false,
    };
}