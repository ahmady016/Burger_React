import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import addExtensions from './Common/addExtensions';
import M from 'materialize-css';

addExtensions();
render(<App />, document.getElementById('root'));
registerServiceWorker();
M.AutoInit();