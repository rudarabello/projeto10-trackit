import styled from "styled-components";
import { useContext } from "react";
import AccountContext from "../components/AccountContext";
import axios from "axios";

export default function TodayHabit(
    { habitName, habitId, isDone, currentSequence, highestSequence }
) {

    const buttonBackgroundColor = isDone ? "#8FC549" : "#EBEBEB";
    const { account } = useContext(AccountContext);

    function toggleCheck() {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`
            }
        };
        if (isDone) {
            axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`, null, config);
        } else {
            axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`, null, config);
        }
    }

    return (
        <Container buttonBackgroundColor={buttonBackgroundColor}
            currentSequenceColor={isDone ? "#8FC549" : "#666666"}
            highestSequenceColor={currentSequence ===
                highestSequence ? "#8FC549" : "#666666"}>
            <div>
                <p>{habitName}</p>
                <div>
                    <p>Sequência atual: <span>{currentSequence}
                        {currentSequence > 1 ? "dias" : "dia"}</span>
                    </p>
                    <p>Seu recorde: <span>{highestSequence}
                        {highestSequence > 1 ? "dias" : "dia"}</span>
                    </p>
                </div>
            </div>
            <button onClick={toggleCheck}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </button>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 25.1vw;
    background-color: #FFFFFF;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    > div {
        color: #666666;
        font-family: 'Lexend Deca', sans-serif;
        > p {
            font-size: 5.3vw;
            line-height: 6.67vw;
        }
        div {
            margin-top: 7px;
            p {
                font-size: 3.47vw;
                line-height: 4.27vw;    
            }
        }
    }
    button {
        background-color: ${props => props.buttonBackgroundColor};
        outline-color: #E7E7E7;
        width: 18.4vw;
        height: 18.4vw;
        box-sizing: border-box;
        
        ion-icon {
            font-size: 9.3vw;
            color: #FFFFFF;
        }
    }
    
`