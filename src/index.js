import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as ServiceWorker from './ServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App xCount={108} yCount={108} />
  </React.StrictMode>,
  document.getElementById('root')
);

ServiceWorker.unregister();
