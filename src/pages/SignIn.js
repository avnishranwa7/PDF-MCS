import styled from "styled-components";

export const SignIn = () =>{
    return(
        <SignInPage>
            <h1>Sign In</h1>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="passwordInput" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
        </SignInPage>
    )
}

const SignInPage = styled.div`
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