import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignIn from '../components/sign/SignIn';
import SignUp from '../components/sign/SignUp';

export default function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, [navigate]);

  return (
    <Wrapper>
      <SignIn />
      <SignUp />
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > form {
    width: 40%;
    background-color: beige;
    padding: 50px 20px 40px;
    margin: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      margin-bottom: 30px;
    }

    > div {
      width: 100%;
      margin-bottom: 20px;

      span {
        font-size: 0.875rem;
        display: block;
        width: 80px;
        margin: 0 0 10px 5px;
      }
      input {
        width: 100%;
        height: 35px;
        border-radius: 15px;
        background: #fff;
        padding: 10px;
        margin-bottom: 5px;
      }
      p {
        font-size: 0.7rem;
        color: #555;
      }
    }
    button {
      margin-top: 20px;
      width: 100px;
      height: 35px;
      border-radius: 20px;
      border: 1px solid #000;
    }
  }
`;
