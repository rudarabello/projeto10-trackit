
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useContext,useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import AccountContext from "../components/AccountContext";
import PorcentageHabitsDoneToday from "../components/PorcentageHabitsDoneToday";
import HabitsToday from "../components/HabitsToday";
import TodayHabit from "../components/TodayHabit";


export default function Today() {

    const { todayHabits, setTodayHabits } = useContext(HabitsToday);
    const { account } = useContext(AccountContext);
    const { porcentageHabitsDoneToday, setPorcentageHabitsDoneToday }
        = useContext(PorcentageHabitsDoneToday);
    const utc = require('dayjs/plugin/utc');
    const updateLocale = require('dayjs/plugin/updateLocale');
    const descripition = habitsDone();
    const listTodayHabits = render();
    const tempAxiosFunction = useRef();
    const tempAxios2Function = useRef();
    const axiosFunction = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${account.token}`
            }
        };
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
            , config
        );
        promise.then(response => setTodayHabits(response.data));
    }
    const axios2Function = () => {
        if (todayHabits.length) {
            setPorcentageHabitsDoneToday(todayHabits.filter
                (habit => habit.done === true)
                .length / todayHabits.length);
        } else {
            setPorcentageHabitsDoneToday(0);
        }
    }

    dayjs.extend(utc);
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        weekdays: [
            "Domingo", "Segunda", "Terça", "Quarta", "Quinta",
            "Sexta", "Sabado"
        ]
    });

    const date = dayjs.utc().local();
    tempAxiosFunction.current = axiosFunction;
    tempAxios2Function.current = axios2Function;

    useEffect(() => {
        tempAxiosFunction.current();
        }, [todayHabits]);

    useEffect(() => {
        tempAxios2Function.current();
        }, [todayHabits]);


    function habitsDone() {
        if (porcentageHabitsDoneToday) {
            return <PorcentageText>
                <p>
                    {(porcentageHabitsDoneToday * 100).toFixed(0)}%
                    dos hábitos concluídos
                </p>
            </PorcentageText>;
        }
        return <p>Nenhum hábito concluído ainda</p>;

    }

    function render() {
        if (todayHabits.length) {
            return todayHabits.map((habit
            ) => <TodayHabit key={habit.id} habitName={habit.name}
                habitId={habit.id} isDone={habit.done}
                currentSequence={habit.currentSequence}
                highestSequence={habit.highestSequence}
                />);
        }
        else {
            return <p>
                Parece que você não tem hábitos ainda, que tal criar algum?
            </p>;
        }

    }

    return (
        <Container>
            <Header />
            <TodaysDescription>
                <p>{date.format("dddd, DD/MM")}</p>
                {descripition}
            </TodaysDescription>
            {listTodayHabits}
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
    padding: 90px 4.53vw;
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
`

const TodaysDescription = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    margin-bottom: 30px;
    > p:first-child {
        color: #126BA5;
        font-size: 6.13vw;
        line-height: 7.47vw;
    }
    > p:last-child {
        color: #BABABA;
        font-size: 4.8vw;
        line-height: 5.87vw;
    }
`
const PorcentageText = styled.div`
    p {
        color: #8FC549;
        font-size: 4.8vw;
        line-height: 5.87vw;
    }
`