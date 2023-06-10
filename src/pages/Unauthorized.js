import styled from 'styled-components';

export const Unauthorized = () =>{
    return(
        <Page>
            <h1>401</h1>
            <p>Unauthorized</p>
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