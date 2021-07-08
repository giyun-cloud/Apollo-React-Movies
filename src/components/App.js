import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:id([0-9]*)" component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default App;
