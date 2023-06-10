import styled from "styled-components";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const SignUp = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = () =>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(()=>{
                setError("");
                console.log("Profile updated");
            }).catch((error)=>{
                setError(error.message);
                console.log(error.message);
            })
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            switch (errorCode) {
                case "auth/invalid-email":
                    setError("Invalid email address");
                    break;

                case "auth/missing-password":
                    setError("Password is required");
                    break;
            
                default:
                    break;
            }
        });
    }

    return(
        <SignUpPage>
            <h1>Sign Up</h1>
            <p>Already have an account? <a href="/login">Sign In</a></p>
            <Form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" class="form-control" id="nameInput" placeholder="Name" width={30} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="passwordInput" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {error &&
                <Error>{error}</Error>}
                <button class="btn btn-primary" onClick={handleSignUp}>Create Account</button>
            </Form>
        </SignUpPage>
    )
}

const Error = styled.p`
    color: red;
`

const Form = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    .form-group{
        margin-bottom: 1rem;
        width: 20rem;
    }

    button{
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    input{
        border-radius: 0px;
    }
`

const SignUpPage = styled.div`
    padding-top: 7rem;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`