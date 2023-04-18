import './assets/css/style.css';
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./AppRoute";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
    </div>
  );
}

export default App;
