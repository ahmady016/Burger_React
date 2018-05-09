import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import addExtensions from './Common/addExtensions';
import M from 'materialize-css';
import MdFormTest from './Common/MdForm/MdFormTest';

addExtensions();
render(<MdFormTest />, document.getElementById('root'));
registerServiceWorker();
M.AutoInit();