import styled from "styled-components";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setError("");
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            switch (errorCode) {
                case "auth/invalid-email":
                    setError("Invalid email address");
                    break;

                case "auth/missing-password":
                    setError("Password is required");
                    break;

                case "auth/wrong-password":
                    setError("Invalid credentials");
                    break;
            
                default:
                    break;
            }
        });
    }

    return(
        <SignInPage>
            <h1>Sign In</h1>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <Form>
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
                <button class="btn btn-primary" onClick={handleLogin}>Sign In</button>
            </Form>
        </SignInPage>
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

const SignInPage = styled.div`
    padding-top: 7rem;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`