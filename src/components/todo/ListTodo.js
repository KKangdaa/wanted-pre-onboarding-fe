import axios from 'axios';
import { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

export default function ListTodo({ list, setList }) {
  useEffect(() => {
    const todoList = async () => {
      await axios
        .get(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                process.env.REACT_APP_LOCALHOST_KEY,
              )}`,
            },
          },
        )
        .then(res => {
          setList(res.data);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    };
    todoList();
  }, [setList]);

  const onClickDelete = async event => {
    const ok = window.confirm('삭제하시겠습니까?');

    if (ok) {
      await axios
        .delete(
          `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${event.target.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                process.env.REACT_APP_LOCALHOST_KEY,
              )}`,
            },
          },
        )
        .then(() => {
          alert('삭제되었습니다');
          window.location.reload();
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  };

  return (
    <TodoList>
      {list?.map((el, index) => (
        <Fragment key={index}>
          <TodoItem el={el} onClickDelete={onClickDelete} />
        </Fragment>
      ))}
    </TodoList>
  );
}

const TodoList = styled.ul`
  > div {
    display: flex;
    justify-content: space-between;
    .option {
      span {
        font-size: 0.8rem;
        color: darkgray;
        :hover {
          color: gray;
          cursor: pointer;
        }
        :last-of-type {
          margin-left: 8px;
        }
      }
    }
  }
  li {
    display: flex;
    align-items: center;
    line-height: 25px;
    font-size: 0.875rem;

    .listCheck {
      margin-right: 5px;
    }

    .editInput {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 3px 8px;
    }
  }
`;
