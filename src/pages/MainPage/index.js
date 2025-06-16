import React from 'react';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';
import Category from '../../components/Category';

const MainPage = () => {
  return (
    <Container>
      {/* 네비게이션 컴포넌트 가져오기 */}
      <Nav />
      <Banner />
      <Category />
      {/* 각각 Row에서 필요한 데이터 요청->requests 안에 있는 fetchTrending: '/trending/all/week' */}
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      {/* requests 안에 있는 fetchTopRated */}
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} />
      {/* requests 안에 있는 fetchActionMovies */}
      <Row title='Action Movies' id='AM' fetchUrl={requests.fetchActionMovies} />
      {/* requests 안에 있는 fetchComedyMoives */}
      <Row title='Comedy Movies' id='CM' fetchUrl={requests.fetchComedyMoives} />
    </Container>
  )
}

const Container = styled.main`
  position: relative;
  // 화면 전체 높이에서 250px만큼 뺀 최소 높이 설정 (footer 같은 걸 뺀 영역 확보용)
  min-height: calc(100vh - 250px);
  // 가로 스크롤 안 생기게 막음 (넘치는 부분 숨기기)
  overflow-x: hidden;
  // (사실 main 태그는 원래 block이지만 명시적으로 써둠)
  display: block;
  // 고정된 네브바 높이만큼 아래로 내려서 가리지 않게 함
  top: 72px;
  // 양옆에 반응형 여백 주기 (화면 너비의 3.5% + 5px 여백)
  padding: 0 calc(3.5vw + 5px);

  // Container 요소의 맨 뒤에 가상의 요소 하나 생성 (배경 이미지용)
  &:after {
    // 배경 이미지 중앙 정렬 + 화면에 꽉 차게 + 반복 없음 + 스크롤 고정
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    // 가상 요소 만들기 위해 필수로 넣어야 하는 값 (내용 없음)
    content: "";
    position: absolute;
    // top, right, bottom, left 전부 0px → 부모 영역에 딱 맞게 꽉 채움
    inset: 0px;
    // 투명도 1 = 선명하게
    opacity: 1;
    // 다른 요소보다 뒤로 보내기
    z-index: -1;
  }
`;

export default MainPage;
