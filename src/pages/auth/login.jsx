import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";


function Login() {
    const [userName, setUserName]=useState("");
    const [password,setPassword]=useState("");

    const nav= useNavigate();


    function handleLogin(e) {
        e.preventDefault();


        if(userName==="nurse1" && password==="nurse123"){
            nav("/nurse");
        }
        else if(userName==="family1" && password==="family123"){
            nav("/family");
        }
        else{
            alert("invalid username or password, check them again!")
        }
        
    }


    return(
        <div className="login-page">
            <div className="login-header">
                <div className="login-logo">
                    <Home size={38} />
            </div>

            <div>
                <h1> CareHome System</h1>
                <p> Nursing Management</p>
            </div>
        </div>

        <div className="login-title">
            <h2> Welcome Back</h2>
            <p>Log in to continue</p>
        </div>

        <form className="login-card" onSubmit={handleLogin}>
            <div className="mb-4">
                <label className="form-label"> Username</label>
                <input
                type="text"
                className="login-input w-100"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
                </div>

                <div className="mb-4">
                    <label className="form-label"> Password </label>
                    <input
                    type="password"
                    className="login-input w-100"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

               <button className="login-btn" type="submit"> Log In</button> 
               <hr />

        </form>
        </div>
    );
    
}


export default Login;