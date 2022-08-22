import axios from 'axios';
import { useState } from 'react';

export default function TodoItem({ el, onClickDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(el.isCompleted ? false : true);
  const [checkBox, setCheckBox] = useState(el.isCompleted);
  const [todo, setTodo] = useState(el.todo);

  const onChangeTodo = event => {
    setTodo(event.target.value);
  };

  const onClickUpdate = async event => {
    if (todo !== el.todo) {
      await axios
        .put(
          `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${event.target.id.toString()}`,
          {
            todo,
            isCompleted,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              'Content-type': 'application/json',
            },
          },
        )
        .then(() => {
          setIsEdit(prev => !prev);
          alert('수정되었습니다');
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    } else {
      alert('수정사항이 없습니다');
      return false;
    }
  };

  const onChangeCheckBox = async event => {
    setIsCompleted(prev => !prev);

    await axios
      .put(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${event.target.id}`,
        {
          todo: el.todo,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-type': 'application/json',
          },
        },
      )
      .then(res => {
        setCheckBox(res.data.isCompleted);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  const onClickEditInput = () => {
    setIsEdit(prev => !prev);
  };

  return (
    <div>
      {isEdit ? (
        <>
          <li>
            <input
              type="checkbox"
              className="listCheck"
              id={el.id}
              onChange={onChangeCheckBox}
              checked={checkBox ? 'checked' : ''}
            />
            <input
              type="text"
              className="editInput"
              onChange={onChangeTodo}
              defaultValue={todo}
            />
          </li>

          <div className="option">
            <span id={el.id} onClick={onClickUpdate}>
              등록
            </span>
            <span onClick={onClickEditInput}>취소</span>
          </div>
        </>
      ) : (
        <>
          <li>
            <input
              type="checkbox"
              className="listCheck"
              id={el.id}
              onChange={onChangeCheckBox}
              checked={checkBox ? 'checked' : ''}
            />
            {todo}
          </li>
          <div className="option">
            <span onClick={onClickEditInput}>수정</span>
            <span id={el.id} onClick={onClickDelete}>
              삭제
            </span>
          </div>
        </>
      )}
    </div>
  );
}
