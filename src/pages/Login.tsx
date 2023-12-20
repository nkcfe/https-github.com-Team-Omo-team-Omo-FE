import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import KakaoLogin from '../components/auth/KakaoLogin';
import auth from '..//axios/auth';
// import KakaoLogin2 from '../components/auth/KakaoLogin2';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginData>();
  const navigate = useNavigate();

  const mutation = useMutation<LoginData, Error, LoginData>(
    async (formData: LoginData) => {
      try {
        const response = await auth.post(`/login`, formData);

        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        console.log(response);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data.message || 'FE: 로그인에 실패했습니다.',
        );
      }
    },
    {
      onSuccess: () => {
        // 로그인 성공 (redirect)
        navigate(`/`); // `${import.meta.env.VITE_APP_SERVER_URL}/`
      },
      onError: (error: Error) => {
        // 로그인 실패 시 에러 메시지 출력 등의 처리
        console.error(error.message);
      },
    },
  );

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };

  return (
    <Base>
      <LoginBox>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <Input
              placeholder="이메일을 입력해주세요."
              {...register('email')}
            />
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              {...register('password')}
            />
          </InputBox>
          <LargeBtn type="submit">
            <Text>로그인</Text>
          </LargeBtn>
        </form>
        {/* <KakaoLogin2 /> */}
        <KakaoLogin />
        <OrLine>
          <div>{line}</div>{' '}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Text color="#AEAEAE">or</Text>
          </div>
          <div>{line}</div>
        </OrLine>
        <div>
          <Text color="#666">아직 회원이 아니신가요?</Text>
          <Link
            style={{ textDecoration: 'none', marginLeft: '10px' }}
            to="/signup"
          >
            <Text color="#44a5ff">회원가입</Text>
          </Link>
        </div>
      </LoginBox>
    </Base>
  );
};

export default Login;

const Base = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 620px;
  height: 703px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Wanted Sans;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin: 83px 0 26px 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 370px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-top: 20px;
  padding: 0 15px;
  &::placeholder {
    color: #a5a5a5;
    font-family: Wanted Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
  }
`;

const LargeBtn = styled.button`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${(props) => props.bgColor || '#f97393'};
  border: none;
  margin: 0 0 12px 0;
  cursor: pointer;
`;

const Text = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.color || '#fff'};
  text-align: center;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  height: 25px;
`;

const OrLine = styled.div`
  width: 300px;
  height: 8px;
  margin: 40px 0 60px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const line = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="133"
    height="2"
    viewBox="0 0 133 2"
    fill="none"
  >
    <path d="M0 1L133 1.00001" stroke="#D9D9D9" />
  </svg>
);
