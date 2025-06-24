import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Css-in-JS 라고 하는 JS 파일 안에서 CSS 처리할 수 있게 해주는 라이브러리
import styled from 'styled-components';
// firebase 인증(auth) 기능 중에서
// - GoogleAuthProvider: 구글 로그인 제공자 객체를 만들어주는 함수
// - signInWithPopup: 팝업 창을 띄워서 로그인 처리하는 함수
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
// 초기화한 Firebase 앱(app)을 가져오기
import app from '../firebase';

const Nav = () => {
    // 네브바 보여줄지 말지 결정하는 상태값 (true: 보이기, false: 숨기기)
    const [show, setShow] = useState(false);

    // 검색을 위한 스테이트
    const [searchValue, setSearchValue] = useState('');

    // useNavigate: 페이지 이동(라우팅)을 위해 사용하는 함수형 훅
    const navigate = useNavigate();

    // 현재 주소(pathname)를 가져와서 "/main" 페이지일 땐 LOGIN 버튼 숨기기 위해 사용
    const { pathname } = useLocation();

    // 구글 로그인 제공자 생성
    // “구글 로그인으로 할 거니까, 그에 맞는 로그인 방법을 써줘!” 라고 알려주는것
    const provider = new GoogleAuthProvider();

    // 초기화된 Firebase 앱(app)을 기반으로 인증(auth) 기능을 사용하겠다는 뜻
    const auth = getAuth(app);

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

    useEffect(() => {
        // onAuthStateChanged: 로그인 상태가 바뀔 때마다 호출되는 Firebase 함수
        // auth: Firebase 인증 객체
        // user: 로그인한 유저가 있으면 user 객체, 없으면 null
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                // ✅ 로그인 상태일 경우
                // → 메인 페이지로 자동 이동
                navigate("/main");
            } else {
                // ❌ 로그아웃 상태일 경우
                // → 로그인 페이지로 자동 이동
                navigate("/");
            }
        })

        // 컴포넌트가 언마운트(사라질)될 때 실행됨
        // → 메모리 누수 방지를 위해 이벤트 구독 해제
        return () => {
            unsubscribe();  // onAuthStateChanged 등록 해제
        }
    }, [auth, navigate]);  // auth 또는 navigate가 바뀔 때마다 useEffect 다시 실행됨

    const handleChange = (e) => {
        // 입력창에 입력된 값을 상태에 저장
        setSearchValue(e.target.value);
        // 입력값을 쿼리로 포함해 /search 페이지로 이동
        navigate(`/search?q=${e.target.value}`);
    }

    // 로그인 버튼 클릭했을 때 handleAuth 함수 호출
    const handleAuth = () => {
        // 구글 로그인을 위해 firebase 에서 제공한 방법 사용
        signInWithPopup(auth ,provider)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }

  return (
    // 컴포넌트에 props로 show 값을 전달 (styled-components에서 $접두어는 커스텀 props로 많이 씀)
    <NavWrapper $show={show}>
      <Logo>
        <a href='/main'>
            <img  
                src='/images/logo.svg'
                alt='Disney plus logo'
            />
        </a>
      </Logo>

      {/* 현재 경로가 '/'일 때는 로그인 버튼, 그 외에는 검색창(Input) 보여주기 */}
      {pathname === '/' ?
        (<Login onClick={handleAuth}>
            Login
        </Login>) 
        :
        // 영화 검색을 위한 입력창
        <Input
            value={searchValue}
            // 입력값이 바뀔 때 searchValue 업데이트
            onChange={handleChange}
            className='nav__input'
            type='text'
            placeholder='영화를 검색해주세요.'
        />  
      }
      
    </NavWrapper>
  )
}

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase; // 대문자로
    letter-spacing: 1.5px;  // 사이 간격
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    // transition: 애니메이션 효과를 줄 때 사용하는 속성
    // 기본 문법 - transition: 속성 지속시간 타이밍함수 지연시간;
    // 모든 스타일 변화가 0.2초 동안 부드럽게(ease) 지연 없이(0s) 실행
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;  // 테두리 안 보이게
    }
`;

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
