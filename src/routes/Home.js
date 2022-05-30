
import axios from 'axios';
import styled from 'styled-components';
import { useContext,useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import AccountContext from "../components/AccountContext";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const localUser = localStorage.getItem("user");
  const navigate = useNavigate();
  const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
 
  const { setAccount } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const button = load();

  useEffect(() => {
    if (localUser !== null) {
        const localUserParse = JSON.parse(localUser);
        setEmail(localUserParse.email);
        setPassword(localUserParse.password);
    }
}, []);


function submit() {
  const user = {email,password};
  const promise = axios.post(URL, user);
  promise.then(response => GoToToday(response.data));
  promise.catch(alert("Dados Incorretos! Não fez o cadastro? Entre no link abaixo"))
};

function load() {
  if (!loading) {
      return <p>Entrar</p>;
  }
}

  function GoToToday(data) {
    setAccount(data);
    const user = {
      email,
      password
    };
    localStorage.removeItem("user");
    const userStrigify = JSON.stringify(user);
    localStorage.setItem("user", userStrigify);
    console.log(data)

    navigate("/Today");
  };

  return (
    <Container>
      <Page>
        <Logo />
        <Form onSubmit={submit}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="email"
            type="email"
            required
            disabled={loading}
            autoComplete="email"
          />
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="senha"
            type="password"
            required
            disabled={loading}
            autoComplete="password"
          />
          <FormButton  type="submit" disabled={loading} >{button}</FormButton>
        </Form>
        <Link to="/Register">Não tem uma conta? Cadastre-se!</Link>
      </Page>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
`;

const Logo = styled.img.attrs(() => ({ src: logo, alt: "Logo TrackIt" }))`
  width: 180px;
  height: 180px;
  margin-bottom: 36px;
`;


const Page = styled.div`
  max-width: 375px;
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 25px;
`;



const Input = styled.input`
  width: 100%;
  height: 45px;
  background: white;
  border: 1px solid #DBDBDB;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  color: #DBDBDB;
  padding: 11px;
`;

const FormButton = styled.button`
  width: 100%;
  height: 45px;
  background: #52B6FF;
  border-radius: 4.63636px;
  font-weight: 400;
  font-size: 21px;
  line-height: 26px;
  color: white;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
`;