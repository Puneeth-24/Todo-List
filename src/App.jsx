import {useState} from "react";
import {useEffect} from "react";
import "./App.css";


export default function App(){


    const [todo,setTodo]=useState("");
    //if there is a todolist in local storage the we use it , else empty todo list is used
    const [todoList,setTodoList]=useState(()=>{
        const getFromLocalStorage=JSON.parse(localStorage.getItem("todos"));

        return getFromLocalStorage?getFromLocalStorage:[]
    });
    
  

    //storing todos in local storage whenever its updated
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList));
    },[todoList])



    //display the todo while typing in the text box
    function inputChange(event){
    setTodo(event.target.value);
    }

    //adding a todo to to todo list
    function addTodo(){
    if(todo.trim().length == 0) return;
    setTodoList([...todoList,{text:todo,completed:false}]);
    setTodo("");
    }

    //deleting a todo
    function deleteTask(index){
        setTodoList(todoList.filter((_,i)=> i!=index));
    }

    //marking a todo as comleted
    function completedTodo(index){
        const updatedTodoList=todoList.map((task,i)=>{ return i==index?{...task,completed:!task.completed}:task});
        setTodoList(updatedTodoList);
    }

    //clearing all todos in todo list and removing the todos in local storage
    function clearAll(){
        setTodoList([]);
        localStorage.removeItem("todos");
        
    }


    return(
        <div className="container">
            <h1>📝Todo List</h1>
            <input 
                type="text"
                onChange={inputChange}
                value={todo}
                placeHolder="Enter task...." />
                
            <button
                onClick={addTodo}
            >Add Task</button>
            <button onClick={clearAll} >Clear All tasks</button>
            {todoList.length>0 ? 
                (<ul>
                    {todoList.map((task,index)=>{
                        return( <li key={index} >
                                   <span style={{textDecoration: task.completed?"line-through":"none"}}>{task.text}</span>
                                    <input type="checkBox" onChange={()=>completedTodo(index)}></input>
                                    <button onClick={()=>deleteTask(index)}>Delete</button>
                                </li>
                            
                        );
                    })}
                </ul>) :
                <p>No tasks!!!</p>
            }
            
        </div>
    );


}