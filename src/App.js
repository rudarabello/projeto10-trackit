
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Habits from "./routes/Habits";
import Today from "./routes/Today";
import Historic from "./routes/Historic";

export default function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Habits" element={<Habits />} />
                <Route path="/Today" element={<Today />} />
                <Route path="/Historic" element={<Historic />} />
            </Routes>
        </BrowserRouter>
    );
}

