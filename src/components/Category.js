import React from 'react'
import styled from 'styled-components';

const Category = () => {
  return (
    <Container>
      <Wrap>
        <img src='/images/viewers-disney.png' alt='disney' />
        {/* autoPlay 할 땐 소리를 항상 muted 해줘야 호버 시 비디오 재생됨 */}
        <video autoPlay loop muted>
          <source src="/videos/disney.mp4" type='video/mp4' />
        </video>
      </Wrap>

      <Wrap>
        <img src='/images/viewers-marvel.png' alt='marvel' />
        <video autoPlay loop muted>
          <source src="/videos/marvel.mp4" type='video/mp4' />
        </video>
      </Wrap>

      <Wrap>
        <img src='/images/viewers-national.png' alt='national' />
        <video autoPlay loop muted>
          <source src="/videos/national-geographic.mp4" type='video/mp4' />
        </video>
      </Wrap>

      <Wrap>
        <img src='/images/viewers-pixar.png' alt='pixar' />
        <video autoPlay loop muted>
          <source src="/videos/pixar.mp4" type='video/mp4' />
        </video>
      </Wrap>

      <Wrap>
        <img src='/images/viewers-starwars.png' alt='starwars' />
        <video autoPlay loop muted>
          <source src="/videos/star-wars.mp4" type='video/mp4' />
        </video>
      </Wrap>
    </Container>
  )
}

// 카테고리 5개 전체 컨테이너
const Container = styled.div`
  margin-top: 30px;
  // 위쪽 30px, 오른쪽 0px, 아래쪽 26px, 왼쪽 0px 여백 설정
  padding: 30px 0px 26px;
  display: grid;
  // 그리드 항목들 사이의 간격을 25px로 설정
  gap: 25px;
  // 5개의 동일한 너비(1fr)의 열을 생성
  grid-template-columns: repeat(5, 1fr);

  // 768 이하일 때 적용
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// 카테고리 하나
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 32px -10px;
    
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`;


export default Category
