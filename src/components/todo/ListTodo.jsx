import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ListTodo(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [deletee, setDeletee] = useState(false);

  useEffect(() => {
    const todoList = async () => {
      await axios
        .get(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        )
        .then(res => {
          props.setList(res.data);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    };
    todoList();
  }, []);

  const onClickDelete = async event => {
    await axios
      .delete(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${event.target.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        alert('삭제되었습니다');
        setDeletee(true);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    if (deletee === true) {
      window.location.reload();
    }
  });
  // useEffect(() => {}, []);

  return (
    <TodoList>
      {props.list?.map((el, index) => (
        <div key={index}>
          <li>
            <input type="checkbox" className="listCheck" />
            {el.todo}
          </li>
          <span id={el.id} onClick={event => onClickDelete(event)}>
            X
          </span>
        </div>
      ))}
    </TodoList>
  );
}

const TodoList = styled.ul`
  padding: 10px 0;
  > div {
    display: flex;
    justify-content: space-between;
    > span {
      color: darkgray;
      :hover {
        color: gray;
        cursor: pointer;
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
  }
`;
