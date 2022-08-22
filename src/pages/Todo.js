import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateTodo from '../components/todo/CreateTodo';
import ListTodo from '../components/todo/ListTodo';

export default function TodoPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/');
    }
  }, [navigate]);

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
  height: 100%;
  display: flex;
  align-items: center;

  > div {
    width: 350px;
    height: 100%;
    border: 1px solid gray;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      margin-bottom: 10px;
    }
  }
`;
