import {Provider} from 'react-redux';
import Store from '../core/stores';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { routes } from '../routes';

import './App.css';

function App() {
  return (
    <Provider store={Store}>
      <Router>
          <Routes>
            <Route path={routes.main.href} element={<routes.main.comp />} />
            <Route path={routes.login.href} element={<routes.login.comp />} />
            <Route path={routes.signup.href} element={<routes.signup.comp />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App;
