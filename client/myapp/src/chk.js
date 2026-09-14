import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showmessage, showerror, showinfo } from './notification';

function ToastTest() {
    return (
        <div className="container mt-5 text-center">

            <h2 className="mb-4">Toast Notification Test</h2>

            <button
                type="button"
                onClick={() => showmessage("Registration successful")}
                className="btn btn-success me-2"
            >
                Success Toast
            </button>

            <button
                type="button"
                onClick={() => showerror("Something went wrong")}
                className="btn btn-danger me-2"
            >
                Error Toast
            </button>

            <button
                type="button"
                onClick={() => showinfo("This is an information message")}
                className="btn btn-info"
            >
                Info Toast
            </button>

            <ToastContainer />

        </div>
    );
}

export default ToastTest;