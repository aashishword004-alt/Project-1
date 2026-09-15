import axios from "axios"
import { useState } from "react";
import { showinfo, showmessage } from "./notification";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  let [email, setEmail] = useState(""); 
  let [password, setPassword] = useState("");

    let userlogin = (e) =>{
       
        e.preventDefault()
        let url = 'http://localhost:5000/users/login'
        axios.post(url,{
            email:email,
            password:password
        }).then((response) =>{
        console.log(response.data)
        let error = response.data[0].error
        if(error !== false)
        {
            showinfo('Mail not found')
            // console.log(error,'what')
        }
        else{
            let success = response.data[1].success
            let message = response.data[2].message
            
            if(success === false)
            {
                showinfo(message)
                //console.log(message,'not success')
            }
            else{
                showmessage(message)
                //console.log(message)

            }
        }
        

        }).catch((error) =>{
               alert(error)
        })
    }
    return (<>
        {/* Navbar */}
        <nav className="navbar navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand linkedin-logo" href="#">
                    Linked<span>in</span>
                </a>
                <div>
                    <a href="#" className="btn join-btn">
                        Join now
                    </a>
                </div>
            </div>
        </nav>
        {/* Login Section */}
        <div className="login-section">
            <ToastContainer/>
            <div className="login-card">
                <h1>Sign in</h1>
                <p className="login-subtitle">Stay updated on your professional world.</p>
                <form onSubmit={userlogin}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email 
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email or phone"
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    {/* Forgot Password */}
                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>
                    {/* Login Button */}
                    <button type="submit" className="btn login-btn w-100">
                        Sign in
                    </button>
                </form>
                {/* Divider */}
                <div className="divider">
                    <span>or</span>
                </div>
                {/* Register */}
                <p className="register-text">
                    New to LinkedIn?
                    <a href="#">Join now</a>
                </p>
            </div>
        </div>
        {/* Footer */}
        <footer>
            <p>© 2026 LinkedIn Clone · Privacy · Terms · Help</p>
        </footer>
        {/* Bootstrap JS */}
    </>
    )
}