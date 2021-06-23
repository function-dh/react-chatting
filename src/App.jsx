import { Route, Redirect } from 'react-router-dom';
import Chat from './pages/list/Chat'
import Room from './pages/room/Room'

function App(){
  return (
    <div id="wrap" className="wrap">
      <Route exact path="/">
        <Redirect to="/list" />
      </Route>
      <Route path="/list" component={Chat} />
      <Route path="/room/:room_id" component={Room} />
    </div>
  );
}

export default App;