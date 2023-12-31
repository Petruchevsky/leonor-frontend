"use client"
import { useState } from "react";
import "./FormContact.css";
import ErrorToast from "./ErrorToast";

function FormContact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, subject, message };  // Definir data

        try {
           const res = await fetch("/api/mailer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {  // Verificar si la respuesta es ok
                throw new Error('Something went wrong');
            }

            setSuccessMsg("Message sent Successfully!");
          

            setTimeout(() => {
                setName("")
                setEmail("")
                setSubject("")
                setMessage("")
                setSuccessMsg("We will respond as soon as possible!");
            }, 4000);

        } catch (error) {
            setErrorMsg(error.message);

            setTimeout(() => {
                setName("")
                setEmail("")
                setSubject("")
                setMessage("")
                setErrorMsg("Please refresh the page, and try again...");
            }, 4000);
        }
    }

    return (
        <form className="form-contact" onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} required />
            <input type="email" value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" value={subject} placeholder="Enter a Subject" onChange={(e) => setSubject(e.target.value)} required />
            <textarea value={message} placeholder="Enter your Message" onChange={(e) => setMessage(e.target.value)} required />
            <input type="submit" value="Send your Message" />

            {successMsg && <p className="successMsg">{successMsg}</p>}
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}

            <ErrorToast errorMsg={errorMsg} successMsg={successMsg} />
        </form>
    )
}

export default FormContact;
