import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import OLXdb from './Firebase/config';
import Context from './store/Context';

ReactDOM.render(
<FirebaseContext.Provider value={{OLXdb}}>
    <Context>
     <App />
    </Context>
</FirebaseContext.Provider>
, document.getElementById('root'));
