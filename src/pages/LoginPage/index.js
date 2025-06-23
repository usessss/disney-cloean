import React from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <Container>
      <Content>
        <Center>
          <LogoOne src='/images/cta-logo-one.svg' alt='로고 첫번째' />
          <SignUpLink>지금 가입</SignUpLink>
          <Description>
            영화에 대한 프리미어 액세스를 얻으십시오.
            디즈니 플러스 가격은 다음 주부터 1000원 인상됩니다.
          </Description>
          <LogoTwo src='/images/cta-logo-two.png' alt='로고 두번째' />
        </Center>
        <BgImage />
      </Content>
    </Container>
  )
}

// 배경 이미지 깔아주는 컴포넌트
const BgImage = styled.div`
  height: 100%;  // 부모 요소 높이에 맞춤
  background-position: top;  // 배경 이미지를 위에 정렬
  background-image: url("/images/login-background.jpg");
  // 이미지를 요소에 꽉 차게 (비율 유지)
  background-size: cover;
  // 배경 이미지 반복 안 함
  background-repeat: no-repeat;
  // 화면 전체 덮기 위해 위치 고정
  position: absolute;
  top: 0; right: 0; left: 0;
  // 다른 요소들보다 뒤에 보이게 함
  z-index: -1;
`;

// 페이지 전체를 감싸는 컨테이너
const Container = styled.section`
   /* 배경 이미지가 화면 바깥까지 튀어나올 수 있어서
      잘라서 안 보이게 하는 안전장치 */
   overflow: hidden;  // 넘치는 내용 숨김

   display: flex;
   flex-direction: column;
   text-align: center;

   height: 100vh;  // 화면 전체 높이
`;

// 로그인 콘텐츠 중심에 정렬하는 박스
const Content = styled.div`
  // 아래쪽 여백 (화면 너비 기준)
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  // 최소 높이 화면 전체
  min-height: 100vh;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 80px 40px;
  height: 100%;
`;

// 로고와 버튼, 텍스트를 담는 중심 컨테이너
const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 첫 번째 로고 이미지
const LogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  // 최소 높이 설정 (안 깨지게)
  min-height: 1px;
  display: block;
  width: 100%;
`;

// 가입하기 버튼
const SignUpLink = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  text-align: center;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: #0483ee;
  }
`;

// 설명 텍스트
const Description = styled.p`
  font-size: 11px;
  // 아래 마진만
  margin: 0 0 24px;
  line-height: 1.5;  // 줄 간격
  letter-spacing: 1.5px;  // 글자 사이 간격
`;

// 두 번째 로고 이미지
const LogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  // 인라인처럼 보이지만 크기 조절 가능
  display: inline-block;
  // 인라인 요소 정렬 기준
  vertical-align: bottom;
  width: 100%;
`;

export default LoginPage;
