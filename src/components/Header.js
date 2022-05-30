import styled from "styled-components";
import AccountContext from "../components/AccountContext";
import { useContext } from "react";

export default function Top() {

    const { account } = useContext(AccountContext);

    return (
        <Container>
            <p>TrackIt</p>
            <img src={account.image} alt={account.name} />
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4.8vw;
    box-sizing: border-box;
    z-index: 1;
    p {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img {
        width: 51px;
        height: 51px;
        border-radius: 50px;
        object-fit: cover;
    }
`