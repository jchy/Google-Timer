// import Todos from "./Components/Todos"
import './App.css';
import Stopwatch from "./Components/Stopwatch";
import Timer from "./Components/Timer";


function App() {
  return (
    <div className="App">
     {/* <Todos/> */}
     <div style={{display: 'flex', flexDirection: 'row', border: '1px solid black', margin: '20px'}}>
       <div style={{borderRight: '1px solid black', padding : "20px"}}>
           <Timer/>
       </div>
       <div style={{borderLeft: '1px solid black', padding : "20px"}}>
          <Stopwatch/>
       </div>
     </div>
    </div>
  );
}

export default App;
