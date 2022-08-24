import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignIn from '../components/sign/SignIn';
import SignUp from '../components/sign/SignUp';

export default function MainPage() {
  const navigate = useNavigate();
  const [isChangeForm, setIsChangeForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/todo');
    }
  });

  const onClickChangeForm = () => {
    setIsChangeForm(prev => !prev);
  };

  return (
    <Wrapper>
      {isChangeForm === false ? (
        <SignIn onClickChangeForm={onClickChangeForm} />
      ) : (
        <SignUp
          onClickChangeForm={onClickChangeForm}
          setIsChangeForm={setIsChangeForm}
        />
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -0%);

  > form {
    width: 300px;
    height: 380px;
    border: 2px solid #abcbff;
    padding: 50px 20px 30px;
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
      &:last-of-type {
        margin-bottom: 10px;
      }

      span {
        font-size: 0.875rem;
        display: block;
        width: 80px;
        margin: 0 0 10px 5px;
      }
      input {
        width: 100%;
        height: 35px;
        border-radius: 8px;
        border: 1px solid #abcbff;
        padding: 10px;
        margin-bottom: 5px;
      }
      p {
        margin: 5px 0 0 5px;
        font-size: 0.7rem;
        color: #555;
      }
    }
    button {
      margin-top: 10px;
      width: 90px;
      height: 35px;
      border-radius: 20px;
      background-color: #abcbff;
      color: #fff;

      &:disabled {
        border: 1px solid #abcbff;
        background-color: #fff;
        color: #abcbff;
      }
    }
    > p {
      font-size: 0.8rem;
      margin-top: 5px;
      cursor: pointer;
    }
  }
`;
