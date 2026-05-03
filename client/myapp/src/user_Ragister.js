import axios from 'axios';


function Ragister() {

     let url = "http://localhost:5000/users/Ragister";
   
     axios({
        method : "POST",
        url : url,
        responseType : "json",
     }).then((res) =>{


     }).catch((Error) =>{
        if(Error === "Network Error"){
            alert("Please check your internet connection and try again.");
        }   

     });


    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>User Registration</title>
            {/* Bootstrap 5 CSS */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            {/* Bootstrap Icons */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
            <style dangerouslySetInnerHTML={{ __html: "\n        body {\n            background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);\n            min-height: 100vh;\n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n        }\n        \n        .register-card {\n            background: rgba(255, 255, 255, 0.95);\n            backdrop-filter: blur(10px);\n            border: 1px solid rgba(13, 110, 253, 0.1);\n            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\n            border-radius: 20px;\n        }\n        \n        .form-control:focus {\n            border-color: #0d6efd;\n            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);\n        }\n        \n        .btn-primary {\n            background: linear-gradient(45deg, #0d6efd, #4dabf7);\n            border: none;\n            border-radius: 12px;\n            padding: 12px 30px;\n            font-weight: 600;\n            transition: all 0.3s ease;\n        }\n        \n        .btn-primary:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 10px 25px rgba(13, 110, 253, 0.4);\n        }\n        \n        .input-group-text {\n            background-color: #f8f9fa;\n            border: 1px solid #dee2e6;\n            color: #0d6efd;\n        }\n        \n        .form-floating > label {\n            color: #6c757d;\n        }\n        \n        .card-header {\n            background: linear-gradient(45deg, #0d6efd, #4dabf7);\n            color: white;\n            border-radius: 20px 20px 0 0 !important;\n            text-align: center;\n            padding: 20px;\n        }\n        \n        .bi {\n            font-size: 1.2rem;\n        }\n    " }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <div className="card register-card">
                            <div className="card-header">
                                <i className="bi bi-person-plus-fill me-2" />
                                <h3 className="mb-0 fw-bold">Create Account</h3>
                                <p className="mb-0 opacity-75 mt-1">Join us today</p>
                            </div>
                            <div className="card-body p-4 p-lg-5">
                                <form>
                                    {/* Full Name */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-person" />
                                        </span>
                                        <input type="text" className="form-control" placeholder="Full Name" required />
                                    </div>
                                    {/* Email */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope" />
                                        </span>
                                        <input type="email" className="form-control" placeholder="Email Address" required />
                                    </div>
                                    {/* Phone */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-telephone" />
                                        </span>
                                        <input type="tel" className="form-control" placeholder="Phone Number" required />
                                    </div>
                                    {/* Password */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill" />
                                        </span>
                                        <input type="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    {/* Confirm Password */}
                                    <div className="input-group mb-4">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill" />
                                        </span>
                                        <input type="password" className="form-control" placeholder="Confirm Password" required />
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
