import React, { useState } from 'react';
import Login from '../login/login';
import Register from '../register/register';
import Users from '../users/users';


function App() {

    const [isLogin, setisLogin] = useState(true);
    const [isUser, setisUser] = useState(false);

    function changeStateLogin() {
        setisLogin(!isLogin)
    }

    function changeStateUser() {
        setisUser(true)
    }

    return (
        <div>
            {
                isUser == false 
                ? isLogin ? <Login changeLogin={changeStateLogin} changeUser={changeStateUser} /> : <Register change={changeStateLogin} /> 
                : ""
            }



            {isLogin && isUser ? <Users /> : <div />}
        </div>
    );
}





export default App;