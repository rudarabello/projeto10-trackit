
import axios from 'axios';
import styled from 'styled-components';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Home() {

  const data = { email, password, };
  const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

  const navigate = useNavigate();
  const promise = axios.post(URL, data);
  promise.then((res) => {
    navigate("/Today", res.data);
  });

  promise.catch((err) => {
    alert(err.response.data.message);
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <Page>
        <Logo />
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="email"
            type="email"
            required
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
            autoComplete="password"
          />
          <FormButton>Entrar</FormButton>
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