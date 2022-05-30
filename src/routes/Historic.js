import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";

import AccountContext from "../components/AccountContext";
import "../assets/calendar.css";
import HabitClickedDay from "../components/HabitClickedDay";

export default function Historic() {

    const [history, setHistory] = useState([]);
    const { account } = useContext(AccountContext);
    const [clickedDay, setClickedDay] = useState(<></>);
    const today = dayjs().format("DD/MM/YYYY");
    const showCalendar = renderCalendar();
    const tempAxiosFunction = useRef();


    const axiosFunction = () => {
        const config = { headers: { Authorization: `Bearer ${account.token}` } };
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config);
        promise.then(response => setHistory(response.data));
        promise.catch(() => alert("Erro no servidor. Faça Login novamente."));
    }


    tempAxiosFunction.current = axiosFunction;


    useEffect(() => {
        tempAxiosFunction.current();
    }, []);

    function verifyDay({ date, view }) {
        const element = history.find(day => day.day === dayjs(date).format("DD/MM/YYYY"));

        if (element && view === "month" && element.day !== today) {
            if (element.habits.filter(habit => !habit.done).length) return "not-all-done";
            return "all-done";
        }
    }

    function disableDay({ date, view }) {
        if (view === "month") {
            if (history.find(day => day.day === dayjs(date).format("DD/MM/YYYY")) || dayjs(date).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")) {
                return false;
            }
            else return true;
        }
    }

    function renderCalendar() {
        if (history.length) {
            return <Calendar
                calendarType="US"
                tileClassName={verifyDay}
                tileDisabled={disableDay}
                onClickDay={(value) => renderClickedDayHabits(value)}
            />;
        }
        else return <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>;
    }

    function renderClickedDayHabits(value) {
        const clickdDate = history.find(day => day.day === dayjs(value).format("DD/MM/YYYY"));
        setClickedDay(
            <ClickedDayHabitsContainer>
                <p>{dayjs(value).format("dddd, DD/MM/YYYY")}</p>
                <p>{Number(clickdDate.habits.filter(habit => habit.done).length * 100 / clickdDate.habits.length).toFixed(0)}% de hábitos concluidos</p>
                {clickdDate.habits.map((habit, i) => <HabitClickedDay
                    key={i}
                    name={habit.name}
                    wasDone={habit.done}
                />)}
            </ClickedDayHabitsContainer>

        );
    }

    return (
        <Container>
            <Header />
            <Content>
                <Info>
                    <h4>Meu histórico</h4>
                </Info>
                {showCalendar}
                {clickedDay}
            </Content>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
    padding: 70px 4.53vw;
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
`

const Content = styled.div`
    padding:4.8vw 25px 4.8vw;
    box-sizing: border-box;
    background-color: #F2F2F2;
    min-height: 100vh;
    
`;

const Info = styled.div`
    width: 375px;
    height: 75px;
    box-sizing: border-box;
    padding: 0px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        color: #126BA5;
    }
    button{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.5px;
        border: none;
        font-weight: 400;
        font-size: 27px;
        color: #FFFFFF;
    }
`;

const ClickedDayHabitsContainer = styled.div`
    background-color: lightsteelblue;
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 13px;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    box-sizing: border-box;
`