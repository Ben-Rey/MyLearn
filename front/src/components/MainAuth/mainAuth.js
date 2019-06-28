import React, { Component } from "react";
//import React from 'react';

import Login from "./login/login.js"
import Register from "./register/register.js"
//import classes from "./mainAuth.module.scss";
import Tabs from './tabsAuth/tabs.js';
require('./styles.scss');



class Main extends Component {

    render(){
        return(
            <div>          
                <Tabs>
                    <div  label="Login">    
                    <Login />
                    </div>
                    <div label="Register"> 
                    <Register />
                    </div>
                </Tabs>
            </div>
        )
    }
   
}


export default Main;