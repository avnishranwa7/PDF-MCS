import styled from "styled-components";

export const SignUp = () =>{
    return(
        <SignUpPage>
            <h1>Sign Up</h1>
            <p>Already have an account? <a href="/login">Sign In</a></p>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="email" class="form-control" id="nameInput" placeholder="Name" width={30}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="passwordInput" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary">Create Account</button>
            </form>
        </SignUpPage>
    )
}

const SignUpPage = styled.div`
    padding-top: 7rem;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;

    form{
        display: flex;
        align-items: center;
        flex-direction: column;
    }

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