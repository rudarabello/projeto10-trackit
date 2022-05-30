import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Habits from "./routes/Habits";
import Today from "./routes/Today";
import Historic from "./routes/Historic";
import AccountContext from "./components/AccountContext";
import PorcentageHabitsDoneToday from "./components/PorcentageHabitsDoneToday";
import HabitsToday from "./components/HabitsToday";

export default function App() {

    const [account, setAccount] = useState({
        id: "",
        name: "",
        image: "",
        email: "",
        password: "",
        token: ""
    });
    const [porcentageHabitsDoneToday, setPorcentageHabitsDoneToday] = useState();

    const [todayHabits, setTodayHabits] = useState([]);




    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            <PorcentageHabitsDoneToday.Provider value={{ porcentageHabitsDoneToday, setPorcentageHabitsDoneToday }}>
                <HabitsToday.Provider value={{ todayHabits, setTodayHabits }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Register" element={<Register />} />
                            <Route path="/Habits" element={<Habits />} />
                            <Route path="/Today" element={<Today />} />
                            <Route path="/Historic" element={<Historic />} />
                        </Routes>
                    </BrowserRouter>
                </HabitsToday.Provider>
            </PorcentageHabitsDoneToday.Provider>
        </AccountContext.Provider>
    );
}

