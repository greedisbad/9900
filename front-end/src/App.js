import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './components/login';
import Register from './components/register';
import Store from './components/store';
import Library from './components/library';
import Cart from './components/cart';
import Detail from './components/detail';
import Shelf from './components/shelf';
import Edit from './components/edit';
import TagSelect from './components/tagSelect';
import Crowdfunding from './components/crowdfunding';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' >
            <Redirect to="/store" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/library" component={Library} />
          <Route exact path="/shelf" component={Shelf} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/tags" component={TagSelect} />
          <Route exact path="/crowdfunding" component={Crowdfunding} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
