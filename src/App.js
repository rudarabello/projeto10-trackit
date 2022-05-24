
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";

export default function App() {

    const [user, setUser] = useState(userObj);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
            </Routes>
        </BrowserRouter>
    );
}

