import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function CreateTodo({ setList }) {
  const [todo, setTodo] = useState('');
  const [createList, setCreateList] = useState('');

  const onChangeTodo = event => {
    setTodo(event.target.value);
  };

  const onClickCreateListTodo = async event => {
    event.preventDefault();

    if (handleValidation()) {
      await axios
        .post(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          { todo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                process.env.REACT_APP_LOCALHOST_KEY,
              )}`,
              'Content-type': 'application/json',
            },
          },
        )
        .then(res => {
          alert('등록 되었습니다');
          setTodo('');
          setCreateList(res.data);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  };
  const handleValidation = () => {
    if (todo === '') {
      alert('할 일을 입력해주세요');
      return false;
    }
    return true;
  };

  useEffect(() => {
    createList && setList(prev => [...prev, createList]);
  }, [setList, createList]);

  return (
    <CreateList method="post" onSubmit={event => onClickCreateListTodo(event)}>
      <input
        type="text"
        value={todo}
        placeholder="할 일을 등록하세요"
        onChange={event => onChangeTodo(event)}
      />
      <button>등록</button>
    </CreateList>
  );
}

const CreateList = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  > input {
    width: 100%;
    height: 30px;
    padding: 10px;
    border: 1px solid gray;
  }
  button {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-left: 10px;
  }
`;
