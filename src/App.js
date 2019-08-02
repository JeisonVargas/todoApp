import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TreeLoad from './Pages/TreeLoad';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TreeLoad} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
