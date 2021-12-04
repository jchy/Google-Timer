import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";

const getTodos = () => {
  const config = {
    url: "https://json-server-mocker-masai.herokuapp.com/tasks",
    method: "get"
  };
  return axios(config);
};

const createTodo = (title) => {
  const payload = {
    title,
    status: false
  };
  const config = {
    url: "https://json-server-mocker-masai.herokuapp.com/tasks",
    method: "post",
    data: payload
  };
  return axios(config);
};

function Todos() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    handleGetTodos();
  }, []);

  const handleGetTodos = () => {
    return getTodos()
      .then((res) => {
        setTodos(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  const updateTodo = (id, status) => {
    return axios({
      url: `https://json-server-mocker-masai.herokuapp.com/tasks/${id}`,
      method: "patch",
      data: {
        status: status
      }
    });
  };
  const markEverythingAsComplete = async () => {
    try {
      const ids = todos.map((item) => item.id);
      // const requests = [];

      for (let id of ids) {
        console.log(id);
        await updateTodo(id, true);
      }

      // const results = await Promise.allSettled(requests);
      // do something with results
      await handleGetTodos();
    } catch (err) {
        setIsError(true);
    }
  };
  const markAsDone = async (id,status) => {
      console.log(id);
    try {
      // const requests = [];
        await updateTodo(id, !status);
      // const results = await Promise.allSettled(requests);
      // do something with results
      await handleGetTodos();
    } catch (err) {
        setIsError(true);
    }
  };

  const onSubmit = async (title) => {
    try {
      setIsLoading(true);
      await createTodo(title);
      await handleGetTodos();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      // manage your error with a state
    }
  };
  if (isLoading) {
    return <div>...loading</div>;
  }
  if(isError){
      return <div>ERROR 404</div>
  }

  const handleDelete=(id) => {
      setTodos(todos.filter((item) => item.id !== id));
  }



return (
    <div>
      <TodoInput onSubmit={onSubmit} />
<br /><br />
      <div >
        {todos.map((item) => (
          <div key={item.id}>
            <span style={{border: '1px solid black', backgroundColor:"black", color:"white", padding:"3px" , marginTop:"10px", borderRadius:"8px", paddingLeft:"10px"}}>{item.title} - </span>
            <span style={{border: '1px solid black', backgroundColor:"black", color:"white", padding:"3px" , marginTop:"10px", borderRadius:"8px", paddingLeft:"10px"}}>{item.status ? "DONE" : "PENDING"}</span>
            <span style={{border: '1px solid black', backgroundColor:"black", color:"white", padding:"3px" , marginTop:"10px", borderRadius:"8px", paddingLeft:"10px"}}>
            <button style={{borderRadius:"8px"}} onClick={()=>markAsDone(item.id, item.status)}>Toggle status</button></span>
            <span style={{border: '1px solid black', backgroundColor:"black", color:"white", padding:"3px" , marginTop:"10px", borderRadius:"8px", paddingLeft:"10px"}}>
            <button style={{borderRadius:"8px"}} onClick={()=>handleDelete(item.id, item.status)}>DELETE</button></span><br /><br />
           
           
          </div>
        ))}
      </div>
      <br /><br />
      <div>
        <button onClick={markEverythingAsComplete}>MARK ALL DONE</button>
      </div>
    </div>
  );
}

export default Todos;

// npm install axios
