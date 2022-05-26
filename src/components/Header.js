import styled from 'styled-components';

function Header(props) {
    const {photo} = props
    return (
        <Container>
            <Titulo>
                <h1>TrackIt</h1>
            </Titulo>
            <Image>
                <img src={photo}/>
            </Image>
        </Container>
    );
}

const Container = styled.div`
width: 100%;
height: 70px;
left: 0px;
top: 0px;
position: fixed;
background-color: #126BA5;
display: flex;
justify-content: space-evenly;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const Titulo = styled.div`
font-family: 'Playball';
font-style: normal;
font-weight: 400;
font-size: 38.982px;
line-height: 49px;
text-align: left;


/* identical to box height */

color: #FFFFFF;
`;

export default Header;