import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Habits from "./routes/Habits";
import Today from "./routes/Today";
import Historic from "./routes/Historic";
import Header from "./components/Header";
import Footer from "./components/Footer";
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


    const showFooter = footer();
    const showTop = top();

    function top() {
        if (account.token)
        return <Header></Header>;
    }

    function footer() {
        if (account.token)
        return <Footer></Footer>;
    }

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            <PorcentageHabitsDoneToday.Provider value={{ porcentageHabitsDoneToday, setPorcentageHabitsDoneToday }}>
                <HabitsToday.Provider value={{ todayHabits, setTodayHabits }}>
                    <BrowserRouter>
                        {showTop}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Register" element={<Register />} />
                            <Route path="/Habits" element={<Habits />} />
                            <Route path="/Today" element={<Today />} />
                            <Route path="/Historic" element={<Historic />} />
                        </Routes>
                        {showFooter}
                    </BrowserRouter>
                </HabitsToday.Provider>
            </PorcentageHabitsDoneToday.Provider>
        </AccountContext.Provider>
    );
}

