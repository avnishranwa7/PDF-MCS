import styled from 'styled-components';

export const NoPage = () =>{
    return(
        <Page>
            <h1>404</h1>
            <p>This page does not exist</p>
        </Page>
    );
}

const Page = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1{
        font-size: 10rem;
    }

    p{
        font-size: 2rem;
    }
`