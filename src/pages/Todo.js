import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateTodo from '../components/todo/CreateTodo';
import ListTodo from '../components/todo/ListTodo';

export default function TodoPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  });

  return (
    <Wrapper>
      <div>
        <h2>할 일</h2>
        <ListTodo list={list} setList={setList} />
        <CreateTodo setList={setList} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    vertical-align: middle;
    width: 350px;
    min-height: 420px;
    border: 2px solid #abcbff;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    display: grid;
    grid-template-rows: auto 1fr auto;

    h2 {
      margin-bottom: 10px;
    }
  }
`;
