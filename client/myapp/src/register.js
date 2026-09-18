
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { showerror, showinfo, showmessage } from "./notification";
import { ToastContainer } from "react-toastify";

export default function Register() {

    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [number, setNumber] = useState('')
    let [password, setPassword] = useState('')
    let [confirmpassword, setconfirmPassword] = useState('')
    let register = (e) => {
        e.preventDefault()
        let url = 'http://localhost:5000/users/register'
        axios.post(url, {
            name: name,
            number: number,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        }).then((response) => {
            console.log(response.data)
            let error = response.data[0].error
            let success = response.data[1].success;
            let message = response.data[2].message;
            if (error !== false) {
                showinfo(message)
                //console.log(error)
            } else {

                if (success === false) {
                    showinfo(message)
                }
                else {
                    //alert(message)
                    showmessage(message)
                }

            }
        }).catch((error) => {
            if (error) {
                console.log(error)
                if (error === 'ERR_NETWORK') {
                    showerror('You  Offline  Either Server is Busy')
                }
            }
        })
    }
    return (
        <>
            {/* Navbar */}
            <nav className="register-navbar">
                <div className="register-container">

                    <a className="register-logo" href="#">
                        Linked<span>in</span>
                    </a>

                    <div className="register-login-text">
                        Already on LinkedIn?
                        <a href="#"> Sign in</a>
                    </div>

                </div>
            </nav>


            {/* Register Section */}
            <div className="register-section">

                <div className="register-card">

                    <h1>Join LinkedIn</h1>
                    <ToastContainer />
                    <p className="register-subtitle">
                        Make the most of your professional life
                    </p>


                    <form onSubmit={register}>

                        {/* Name */}
                        <div className="register-field">
                            <label htmlFor="name">
                                Full name
                            </label>

                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                placeholder="Enter your full name"
                                required />
                        </div>


                        {/* Email */}
                        <div className="register-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="Enter your email"
                                required
                            />
                        </div>


                        {/* Phone */}
                        <div className="register-field">
                            <label htmlFor="number">
                                Phone number
                            </label>

                            <input
                                type="text"
                                id="number"
                                value={number}
                                onChange={(e) => { setNumber(e.target.value) }}
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>


                        {/* Password */}
                        <div className="register-field">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder="Enter your password"
                                required
                            />
                        </div>


                        {/* Confirm Password */}
                        <div className="register-field">
                            <label htmlFor="confirmPassword">
                                Confirm password
                            </label>

                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmpassword}
                                onChange={(e) => { setconfirmPassword(e.target.value) }}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>


                        <p className="terms-text">
                            By clicking Agree & Join, you agree to our
                            User Agreement, Privacy Policy and Cookie Policy.
                        </p>


                        <button
                            type="submit"
                            className="register-btn"
                        >
                            Agree & Join
                        </button>

                    </form>


                    {/* Divider */}
                    <div className="register-divider">
                        <span>or</span>
                    </div>


                    {/* Login */}
                    <p className="already-account">
                        Already have an account?
                        <a href="#"> Sign in</a>
                    </p>

                </div>

            </div>


            {/* Footer */}
            <footer className="register-footer">
                <p>
                    © 2026 LinkedIn Clone · Privacy · Terms · Help
                </p>
            </footer>
        </>
    );
}

