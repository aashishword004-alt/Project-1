import axios from 'axios';
import { useState } from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showmessage, showerror, showinfo } from './notification';

function Ragister() {

    // name, email, number , password, confirmPassword key value pair
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [number, setNumber] = useState("");
    let [password, setPassword] = useState("");
    let [confirmpassword, setConfirmpassword] = useState("");

    // let UserRagister = (e) => {

    //     let url = "http://localhost:5000/users/Ragister";
    //     let form = new FormData();
    //     form.append('name', name);
    //     form.append('email', email);
    //     form.append('number', number);
    //     form.append('password', password);
    //     form.append('confirmPassword', confirmPassword);

    //     axios({
    //         method: 'post',
    //         url: url,
    //         responseType: 'json',
    //         data: form
    //     }).then((response) => {
    //         console.log(response.data);
    //          let error = response.data[0].error;
    //          if(error !== false)
    //          {
    //             alert(error);
    //          }else{
    //             let success = response.data[1].message;
    //             let message = response.data[2].message;
    //             if(success === false) 
    //                 {
    //                     console.log(message);
    //                 }
    //                 else{
    //                     alert(message);

    //                 }
    //             }

    //     }).catch((error) => {
    //         if (error === 'NETWORK_error') {
    //             alert("Network error. Please check your connection and try again.");
    //         }

    //     })



    //     e.preventDefault();
    // }
    let UserRagister = (e) => {
        e.preventDefault();

        let url = "http://localhost:5000/users/register";
        axios.post(url, {
            name: name,
            email: email,
            number: number,
            password: password,
            confirmpassword: confirmpassword

        }).then((response) => {
            console.log(response.data);

            let error = response.data[0].error;

            if (error !== false) {
                showinfo('This Mail is Not Valid Please Try Another Mail')
            } else {
                let success = response.data[1].success;
                let message = response.data[2].message;

                if (success === false) {
                    showmessage(message)
                    console.log(message);
                } else {
                    alert(message);
                    showinfo(message)
                }
            }
        })
            .catch((error) => {
                // console.log(error);
                // alert("Something went wrong");
                showerror('Somthing went Wrong in server')
            });
    };


    return (
        <div>

            <title>User Registration</title>
            {/* Bootstrap 5 CSS */}
            <div className="container">
                <ToastContainer />
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <div className="card register-card">
                            <div className="card-header">
                                <i className="bi bi-person-plus-fill me-2" />
                                <h3 className="mb-0 fw-bold">Create Account</h3>
                                <p className="mb-0 opacity-75 mt-1">Join us today</p>
                            </div>
                            <div className="card-body p-4 p-lg-5">
                                <form onSubmit={UserRagister}>
                                    {/* Full Name */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-person" />
                                        </span>
                                        <input type="text"
                                            value={name} onChange={(e) => setName(e.target.value)}
                                            className="form-control" placeholder="Full Name" required />
                                    </div>
                                    {/* Email */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope" />
                                        </span>
                                        <input type="email"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            className="form-control" placeholder="Email Address" required />
                                    </div>
                                    {/* Phone */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-telephone" />
                                        </span>
                                        <input type="tel"
                                            value={number} onChange={(e) => setNumber(e.target.value)}
                                            className="form-control" placeholder="Phone Number" required />
                                    </div>
                                    {/* Password */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill" />
                                        </span>
                                        <input type="password"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            className="form-control" placeholder="Password" required />
                                    </div>
                                    {/* Confirm Password */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill" />
                                        </span>
                                        <input type="password"
                                            value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}
                                            className="form-control" placeholder="Confirm Password" required />
                                    </div>
                                    {/* Terms Checkbox */}
                                    <div className="form-check mb-4">
                                        <input className="form-check-input" type="checkbox" id="terms" required />
                                        <label className="form-check-label" htmlFor="terms">
                                            I agree to the <a href="#" className="text-primary fw-semibold">Terms of Service</a> and
                                            <a href="#" className="text-primary fw-semibold">Privacy Policy</a>
                                        </label>
                                    </div>
                                    {/* Register Button */}
                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            <i className="bi bi-check-circle me-2" />
                                            Register Now
                                        </button>
                                    </div>
                                    {/* Login Link */}
                                    <div className="text-center">
                                        <p className="mb-0 text-muted">
                                            Already have an account?
                                            <a href="#" className="text-primary fw-semibold">Sign in</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bootstrap 5 JS */}
        </div>)


}

export default Ragister;
