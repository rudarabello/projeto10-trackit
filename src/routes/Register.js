import {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate, } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Register() {


    const navigate = useNavigate();
    const API = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [URL, setURL] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const register = {
            email,
            name,
            image: URL,
            password
        };

        const promise = axios.post(API, register);

        promise.then(() => {
            alert("Cadastro concluído com Sucesso!");
            navigate("/");
        });

        promise.catch((err) => {
            alert(err.response.data.message);
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
                    <Input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        placeholder="nome"
                        type="text"
                        required
                        autoComplete="name"
                    />
                    <Input
                        onChange={(e) => {
                            setURL(e.target.value);
                        }}
                        value={URL}
                        placeholder="foto"
                        type="URL"
                        required
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

