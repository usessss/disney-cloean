import React, { useEffect, useState } from 'react';
// Css-in-JS 라고 하는 JS 파일 안에서 CSS 처리할 수 있게 해주는 라이브러리
import styled from 'styled-components';

const Nav = () => {
    // 네브바 보여줄지 말지 결정하는 상태값 (true: 보이기, false: 숨기기)
    const [show, setShow] = useState(false);

    const listener = () => {
        // 현재 스크롤 위치가 50px보다 크면 네브바 보여주기
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            // 50px 이하로 올라오면 네브바 숨기기
            setShow(false);
        }
    }

    // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨 (빈 배열이라서)
    useEffect(() => {
        // 스크롤할 때마다 실행되는 함수 등록
        window.addEventListener('scroll', listener);

        // 스크롤 이벤트 제거해서 메모리 낭비와 중복 실행 방지
        return () => {
            window.removeEventListener('scroll', listener);
        }
    }, []);

  return (
    // 컴포넌트에 props로 show 값을 전달 (styled-components에서 $접두어는 커스텀 props로 많이 씀)
    <NavWrapper $show={show}>
      <Logo>
        <img  
            src='/images/logo.svg'
            alt='Disney plus logo'
        />
      </Logo>

      {/* 검색창을 위한 인풋 */}
      <Input>

      </Input>
    </NavWrapper>
  )
}

const Input = styled.input`
    position: fixed;

    // 수평 정중앙 정렬
    left: 50%; 
    transform: translate(-50%, 0);

    background-color: rgba(0, 0, 0, 0.582);
    color: white;
    padding: 5px;
    border: 1px solid lightgray;
`

const NavWrapper = styled.nav`
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 70px;
    // show가 true일 땐 배경 어둡게, false일 땐 투명하게 설정
    background-color: ${props => props.$show ? "#090b13" : "transparent"};

    // 가로로 정렬하면서, 양쪽 끝에 배치 + 세로 가운데 정렬
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    padding: 0 36px;  // 위아래 양옆
    // 글자가 "N E T F L I X" 처럼 넓게 퍼짐(글자 사이 간격)
    letter-spacing: 16px; 
    // 같은 계층의 요소들 보다 앞으로 튀어나오게
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    // 한 줄에 놓고 싶고 크기도 조절하고 싶을 때 쓰는 거
    display: inline-block;

    img {
        /* 
            img 태그 기본이 inline → 하단에 조금 여백 생김
            block으로 바꾸면 불필요한 여백 사라지고 
            부모인 a 태그(Logo)에 딱 맞게 찰싹 붙음 
        */  
        display: block;
        width: 100%;
    }
`;

export default Nav;
