import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React from 'react';
import ReactDOM from 'react-dom';
import StartPage from './StartPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <StartPage />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
