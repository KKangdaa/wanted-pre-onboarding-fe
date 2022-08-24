import axios from 'axios';
import { useState } from 'react';

export default function SignUp({ onClickChangeForm, setIsChangeForm }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isActive, setIsActive] = useState('disabled');

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordRegex = /^[A-Za-z0-9]{8,}$/;

  const onClickSignUp = async event => {
    event.preventDefault();

    const ok = window.confirm('가입하시겠습니까?');

    if (handleValidation() && ok) {
      const { email, password } = values;
      await axios
        .post(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup',
          { email, password },
          {
            headers: {
              'Content-type': 'application/json',
            },
          },
        )
        .then(() => {
          alert('가입이 완료되었습니다');
          setValues({
            email: '',
            password: '',
          });
          setIsChangeForm(prev => !prev);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === '' || password === '') {
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
    <form method="post" onSubmit={event => onClickSignUp(event)}>
      <h2>회원가입</h2>
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
        <p>* 비밀번호는 8자 이상 입력 바랍니다</p>
      </div>
      <button disabled={isActive}>회원가입</button>
      <br />
      <p onClick={onClickChangeForm}>로그인</p>
    </form>
  );
}
