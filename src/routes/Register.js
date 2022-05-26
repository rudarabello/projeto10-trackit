import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Register() {
    const navigate = useNavigate();
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [image, setImage] = React.useState("");

    const [disabled, setDisabled] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setDisabled(true);

        const data = {
            email,
            name,
            image,
            password,
        };

        const promise = axios.post(URL, data);

        promise.then(() => {
            alert("Cadastro concluído com Sucesso!");
            navigate("/");
        });

        promise.catch((err) => {
            alert(err.response.data.message);
            setDisabled(false);
        });
    }

    return (
        <Container>
            <Page>
                <Logo />
                <Form autoComplete="on" onSubmit={handleSubmit}>
                    <Input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="email"
                        type="email"
                        required
                        disabled={disabled}
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
                        disabled={disabled}
                        autoComplete="password"
                    />
                    <Input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        placeholder="nome"
                        type="text"
                        required
                        disabled={disabled}
                        autoComplete="name"
                    />
                    <Input
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                        value={image}
                        placeholder="foto"
                        type="text"
                        required
                        disabled={disabled}
                        autoComplete="image"
                    />
                    <FormButton>Cadastrar</FormButton>
                </Form>
                <Link to="/">Já tem uma conta? Faça login!</Link>
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