import "./App.css";
import Create from "./components/create/create";
import Read from "./components/read/read";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Update from "./components/update/update";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="main">
        <div>
          <Route exact path="/" component={Read} />
        </div>

        <div style={{ marginTop: 20 }}>
          <Route exact path="/create" component={Create} />
        </div>

        <Route path="/update" component={Update} />
      </div>
    </Router>
  );
}

export default App;
