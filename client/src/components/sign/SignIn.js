import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api';

export default function SignIn({ onClickChangeForm }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isActive, setIsActive] = useState('disabled');

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordRegex = /^[A-Za-z0-9]{8,}$/;

  const onClickSignIn = async event => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, password } = values;
      await axios
        .post(
          `${API_BASE_URL}/auth/signin`,
          { email, password },
          {
            headers: {
              'Content-type': 'application/json',
            },
          },
        )
        .then(res => {
          alert('로그인이 완료되었습니다');
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            res.data.access_token,
          );
          navigate(`/todo`);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === '' && password === '') {
      alert('빈칸을 채워주세요');
      return false;
    }
    return true;
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if (emailRegex.test(values.email) && passwordRegex.test(values.password)) {
      setIsActive('');
    }
  };

  return (
    <form method="post" onSubmit={event => onClickSignIn(event)}>
      <h2>로그인</h2>
      <div>
        <span>이메일</span>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={event => handleChange(event)}
        />
      </div>
      <div>
        <span>비밀번호</span>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={event => handleChange(event)}
        />
      </div>
      <button disabled={isActive}>로그인</button>
      <br />
      <p onClick={onClickChangeForm}>회원가입</p>
    </form>
  );
}
