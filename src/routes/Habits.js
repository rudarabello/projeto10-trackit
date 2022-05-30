
import styled from "styled-components";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateHabit from "../components/CreateHabit";
import Day from "../components/Day";
import HabitsToday from "../components/HabitsToday";
import PorcentageHabitsDoneToday from "../components/PorcentageHabitsDoneToday";
import AccountContext from "../components/AccountContext";

export default function Habits() {

    const { account } = useContext(AccountContext);
    const [habits, setHabits] = useState([]);
    const [addHabit, setAddHabit] = useState("none");
    const [loading, setLoading] = useState(false);
    const [newHabit, setNewHabit] = useState({ name: "", days: [] });
    const [opacit, setOpacit] = useState(1);
    const [inputBackgroundColor, setInputBackgroundColor] = useState("#FFFFFF");
    const { setPorcentageHabitsDoneToday } = useContext(PorcentageHabitsDoneToday);
    const { todayHabits } = useContext(HabitsToday);
    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const showLoading = insideSaveHabit();
    const MyHabits = renderHabits();
    const makeHabit = renderNewHabit();
    const config = {headers: { Authorization: `Bearer ${account.token}`}};
    const tempAxiosFunction = useRef();
    const tempAxios2Function = useRef();
    const axiosFunction = () => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(response => setHabits(response.data));
        promise.catch(() => alert(`Deu erro no servidor!`));}
    const axios2Function = () => {
        if (todayHabits.length) {
            setPorcentageHabitsDoneToday(todayHabits.filter(habit => habit.done === true).length / todayHabits.length);
        } else {
            setPorcentageHabitsDoneToday(0);
        }}

    tempAxiosFunction.current = axiosFunction;
    tempAxios2Function.current = axios2Function;

    useEffect(() => {
        tempAxiosFunction.current();
    }, [habits]);


    useEffect(() => {
        tempAxios2Function.current();
    }, [habits]);

    function renderHabits() {
        if (habits.length > 0) {
            return habits.map((habit, i) => <CreateHabit key={i} habit={habit} />);
        } else {
            return <Text>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </Text>
        }

    }

    function renderNewHabit() {
        if (addHabit === "none") {
            return <></>;
        } else {
            return <NewHabit
                display={addHabit} opacit={opacit} inputBackgroundColor={inputBackgroundColor} >
                <input
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })} placeholder="nome do hábito"
                    disabled={loading}
                />
                <div>
                    {weekdays.map((day, i) => <Day key={i} index={i} day={day} newHabit={newHabit} setNewHabit={setNewHabit} loading={loading} />)}
                </div>
                <div>
                    <button onClick={cancel} disabled={loading}>
                        Cancelar
                    </button>
                    <button onClick={saveHabit} disabled={loading}>
                        {showLoading}
                    </button>
                </div>
            </NewHabit>;
        }
    }

    function insideSaveHabit() {
        if (loading) return <ThreeDots width="11.7vw" height="2.93vw" color="#FFFFFF" />;
        return <>Salvar</>;
    }

    function cancel() {
        setAddHabit("none");
    }

    function sucessAddinghabit(data) {
        setHabits([...habits, data]);
        setAddHabit("none");
        setNewHabit({ ...newHabit, name: "", days: [] });
        setOpacit(1);
        setLoading(false);
        setInputBackgroundColor("#FFFFFF");
    }

    function failureAddingHabit() {
        alert("Erro no servidor!");
    }

    function saveHabit() {
        if (newHabit.name && newHabit.days.length) {
            setOpacit(0.7);
            setLoading(true);
            setInputBackgroundColor("#F2F2F2");
            const config = {
                headers: {
                    Authorization: `Bearer ${account.token}`
                }
            };
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newHabit, config);
            promise.then(response => sucessAddinghabit(response.data));
            promise.catch(() => failureAddingHabit());
        }
        else {
            alert("Preencha o nome do hábito e marque pelo menos um dia da semana!");
        }

    }

    return (
        <Page>
            <Header />
            <Content>
                <Info>
                    <h4>Meus hábitos</h4>
                    <button onClick={() => setAddHabit("column")}>+</button>
                </Info>
                <HabitList>
                    {makeHabit}
                    {MyHabits}
                </HabitList>
            </Content>
            <Footer />
        </Page>
    );

}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    padding: 90px 4.8vw 25px 4.8vw;
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

const HabitList = styled.div`
    box-sizing: border-box;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    
    h5{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #666666;
        margin: 0 20px;
    }
`;

const Text = styled.p`
    font-size: 4.8vw;
    line-height: 5.87vw;
    font-family: 'Lexend Deca', sans-serif;
    color: #666666;
    margin-top: 30px;
`

const NewHabit = styled.div`
    background-color: #FFFFFF;
    width: 90.7vw;
    height: 48vw;
    margin-top: 20px;
    display: ${props => props.display};
    flex-direction: column;
    box-sizing: border-box;
    padding: 4.27vw;
    font-family: 'Lexend Deca', sans-serif;
    border-radius: 5px;
    opacity: ${props => props.opacit};
    input {
        width: 100%;
        height: 12vw;
        border: 1px solid #D4D4D4;
        font-size: 5.3vw;
        line-height: 6.67vw;
        border-radius: 5px;
        padding-left: 2.93vw;
        background-color: ${props => props.inputBackgroundColor};
        font-family: 'Lexend Deca', sans-serif;
        &::placeholder {
            color: #DBDBDB;
            font-size: 5.3vw;
            line-height: 6.67vw;
            font-family: 'Lexend Deca', sans-serif;
        }
    }
    > div {
        display: flex;
        justify-content: space-between;
        width: 71.73vw;
        margin-top: 8px;
        margin-bottom: 15px; 
        font-family: 'Lexend Deca', sans-serif;
    }
    > div:last-child {
        display: flex;
        width: 100%;
        justify-content: end;
        align-items: center;
        margin-bottom: 0;
        margin-top: 8vw;
        align-self: flex-end;
        font-family: 'Lexend Deca', sans-serif;
        button:first-child {
            color: #52B6FF;
            line-height: 5.3vw;
            font-size: 4.27vw; 
            margin-right: 6.13vw;
            margin-top: 0;
            background-color: #FFFFFF;
            outline: none;
            border: none;
            opacity: ${props => props.opacit};
        }
        button:last-child {
            width: 22.4vw;
            height: 9.33vw;
            color: #FFFFFF;
            background-color: #52B6FF;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            line-height: 5.3vw;
            font-size: 4.27vw; 
            opacity: ${props => props.opacit};
            border: none;
        }
    }
`