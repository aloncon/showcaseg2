import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import page2 from './page2'
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    NavLink
} from 'react-router-dom';

//import { Router } from 'react-router';

import Stores from './stores'
import { Provider } from 'mobx-react';


ReactDOM.render(
<Provider {...Stores}>
<HashRouter>
        <div>   
      
        

        <Route exact path="/" component={App}/>
        <Route path="/App" component={App}/>
        <Route path="/page2" component={page2}/>
            
        
        
        </div>
   </HashRouter>       
</Provider>

, document.getElementById('root'));
registerServiceWorker();
