import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Todo from "./component/TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/fontawesome-free-solid";
function switchFun() {
  alert("Hi");
}
function App() {
  return (
    <div className="App">
      <header className="App-header text-center">
        <div className="container position-relative">
          <div className="switch-btn m-2">
            <Button variant="warning" onClick={switchFun}>
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
            </Button>
          </div>
          <img src={logo} className="App-logo mt-5" alt="logo" />
        </div>
      </header>
      <main className="App-body container">
        <Todo></Todo>
      </main>
    </div>
  );
}

export default App;
