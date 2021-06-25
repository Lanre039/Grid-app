import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

import { AuthProvider } from "./context/auth";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
