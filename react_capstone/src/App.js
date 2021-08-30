import './App.css';
import { createStore } from "redux";
import LoginForm from './Components/LoginForm';
 
const rootReducer = (state) => {
  return {
    linksFromReduxStore: [
      { title: 'Google', url: 'http://www.google.com' },
      { title: 'Yahoo', url: 'http://www.yahoo.com' },
    ]
  }
};
const store = createStore(
rootReducer, 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm></LoginForm>
      </header>
    </div>
  );
}

export default App;
