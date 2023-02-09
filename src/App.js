import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./component/addItem";
function App() {
  return (
    <div className="App">
      <header className="App-header text-center">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-body container">
        <Todo></Todo>
      </main>
    </div>
  );
}

export default App;
