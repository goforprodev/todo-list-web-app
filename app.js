// get our dom elements
const inputEl = document.querySelector("#todo-input")
const formEl = document.querySelector("#formEl")
const todosContainer = document.querySelector("#todos-conatiner")
const noOfTodo = document.querySelector("#no-items")
const filterBtn = document.querySelectorAll(".btn-filter")
const btnCompleted = document.querySelectorAll(".btn-completed")
const btnActive = document.querySelectorAll(".btn-active")
const btnAll = document.querySelectorAll(".btn-all")
const btnClearCompleted = document.querySelector("#clear-completed");



document.addEventListener('DOMContentLoaded',() => {    
            // const todos = []
            const todoRef = JSON.parse(localStorage.getItem('todosRef'));
            todos = todoRef || [];
            function storeTasks(){
                localStorage.setItem("todosRef",JSON.stringify(todos))
            }
           
        
            formEl.addEventListener("submit",(e) => {
                e.preventDefault();
                let todoText = inputEl.value;
                // trim todos 
                todoText = todoText.trim()
                const todo = {
                    id:new Date().getTime(),
                    text:todoText,
                    completed:false
                }
                todoText === "" ? null : todos.push(todo)
                displayTodo();
                inputEl.value = ""
                storeTasks()
            })
            
            function displayTodo(){
                let todoInput = "";
                todos.length > 0?  todos.forEach((todo) => {
                    const isCompleted = todo.completed ? 'strike' : '';
                    const isCheck = todo.completed ? 'complete' : '';
                    todoInput += `<li class="todo" data-key=${todo.id}>
                    <div class="check ${isCheck}">
                    <svg data-id = ${todo.id} xmlns="http://www.w3.org/2000/svg"width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                    </div>
                    <div class="todo-text ${isCompleted}">${todo.text}</div>
                    <div class="cross">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="cross" data-id = ${todo.id}><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                    </div>
                    </li>`
                    todosContainer.innerHTML = todoInput;
                }): todosContainer.innerHTML = `<li class="todo">
                <div class="todo-text center">No todo to display</div>
              </li>`
        
              noOfTodo.innerHTML = todos.length
                
              
            }
        
            function generateHTML({id,text ,completed}){
                const isCompleted = completed ? 'strike' : '';
                const isCheck = completed ? 'complete' : '';
                return `<li class="todo" data-key=${id}>
                <div class="check ${isCheck}">
                <svg data-id = ${id} xmlns="http://www.w3.org/2000/svg"width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                </div>
                <div class="todo-text ${isCompleted}">${text}</div>
                <div class="cross">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="cross" data-id = ${id}><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                </div>
                </li>`
            }
        
            function deleteTodo(id){
                const filteredTodo = todos.filter(todo => todo.id != id);
                todos = filteredTodo
                storeTasks()
            }
            // function strike(id){
        
            // }
            todosContainer.addEventListener("click",e => {
                let todoId;
                // console.log(e.target.classList)
                if(e.target.classList.contains("cross")){
                    todoId = e.target.dataset.id
                    deleteTodo(todoId)
                }else if(e.target.classList.contains("check")){
                    const itemKey = e.target.parentElement.dataset.key
                    // find index
                    const index = todos.findIndex(todo => todo.id == Number(itemKey))
                    todos[index].completed = !todos[index].completed;
                    storeTasks()
                }else{
                    return null;
                }
                displayTodo()
            
            })
        
              // -----FILTER BUTTONS------------
              btnCompleted.forEach(btn => {
                btn.addEventListener("click", () => {
                    const completedTodos = todos.filter(todo => todo.completed == true)
                    showFilteredTodos(completedTodos)
                    addRemove(btn)
                })
                
        
            })
        
            btnActive.forEach(btn => {
                btn.addEventListener("click", () => {
                    const activeTodos = todos.filter(todo => todo.completed == false)
                    showFilteredTodos(activeTodos)
                    addRemove(btn)
                })
            })
            btnAll.forEach(btn => {
                btn.addEventListener("click", () => {
                    displayTodo()
                    addRemove(btn)
                })
            })
        
            function addRemove(btn){
                filterBtn.forEach(fillbtn => fillbtn.classList.remove('active'));
                btn.classList.add("active")
            }
        
            function showFilteredTodos(todoArr){
                todosContainer.innerHTML = ""
                if(todoArr.length == 0){todosContainer.innerHTML = `<li class="todo">
                <div class="todo-text center">No todo to display</div>
              </li>` }
        
              todoArr.forEach(todo => {
                const markup = generateHTML({...todo})
                todosContainer.insertAdjacentHTML("beforeend",markup)
            })
        
            }
            // -----FILTER BUTTONS------------
        
            // clear all completed
            btnClearCompleted.addEventListener("click",() => {
                const allExceptCompleted = todos.filter(todo => todo.completed == false);
                todos = allExceptCompleted;
                storeTasks()
                displayTodo()
            })
            // clear all completed

            storeTasks();   
            displayTodo()
        

})

