import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import "./login.css"
import api from "../../service/api";

function Login() {
    const [userName, setUserName]=useState("");
    const [password,setPassword]=useState("");

    const nav= useNavigate();


   async function handleLogin(e) {
        e.preventDefault();

        try{
            const response=await api.post("/auth/login",{
                username:userName,
                password:password,
            });

            const user=response.data;

            localStorage.setItem("user",JSON.stringify(user));

             if(user.user_role==="nurse"){
            nav("/nurse");
        }
        else if(user.user_role==="family"){
            nav("/family");
        }
    }
    catch(error){
            alert("invalid username or password, check them again!");
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
            <div >
                <label> Username</label>
                <input
                type="text"
                className="login-input"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                />
                </div>

                <div>
                    <label> Password </label>
                    <input
                    type="password"
                    className="login-input"
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