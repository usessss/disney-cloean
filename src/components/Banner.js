import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {
  // 데이터 가져왔으면 항상 해줘야할 건 데이터 기억하기
  // movie는 저장된 영화 데이터고, setMovie는 그걸 바꿔주는 도구
  const [movie, setMovie] = useState(null);

  // Play 버튼을 위한 스테이트
  const [isClicked, setIsClicked] = useState(false);

  // 배너 이미지 새로고침 할 때마다 이미지 다른 거 불러올것
  useEffect(() =>{
    fetchData();
  }, []);

  const fetchData = async () => {
    // fetch 대신 axios로 이미지 비동기 요청 보내기
    // 데이터 받아올 땐 GET 메서드 이용
    const response = await axiosInstance.get(requests.fetchNowPlaying);
    console.log(response);

    // 영화 목록 중 랜덤으로 하나 골라서 그 영화의 id 값 저장
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id;
    console.log(movieId);

    // 랜덤으로 뽑은 movieId를 이용해 해당 영화의 상세 정보 요청
    /* {data} 구조분해할당 -> 응답(Response) 객체 중에서 data만 꺼내서 쓰겠다는 뜻
      {data: movieDetail} -> data를 movieDetail이라는 이름으로 바꿔서 꺼낸다는 뜻 */
    const {data: movieDetail} = await axiosInstance.get( `movie/${movieId}`, {
      // TMDB API 문서에서 "append_to_response=videos"를 붙이면 영상 정보도 함께 주기로 약속되어 있음
      params: { append_to_response: "videos" }
    });
    setMovie(movieDetail);
    console.log("movieDetail", movieDetail);
  }

  /*
    movie?.backdrop_path 대신 if (!movie) return ... 먼저 써주면
    movie가 null일 땐 아예 아래 코드 실행되지 않아 안전하게 movie.backdrop_path 써도 되는 것
  */
  if (!movie) {
    return <div>loading...</div>
  }

  // Play 버튼 클릭 안 됐을 땐 
  if (!isClicked) {
    return (
      <div className='banner'
        style={{
          /* 
            실행순서 : state, return 부분, useEffect이기 때문에
            state 초기 값 null이므로 null.backdrop_path니까 에러 나는 것
            옵셔널 체이닝(?) 사용하면 해결됨
          */
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {/* title 없으면 original_title */}
            {movie.title || movie.original_title}
          </h1>

          <div className='banner__buttons'>
            {/* 플레이할 영상이 있으면 버튼 보여주고 없으면 안 보여주기 */}
            {movie.videos?.results[0]?.key ? 
              <button
                className='banner__button play'
                onClick={() => setIsClicked(true)}
              >
                Play
              </button> 
              : 
              null
            }
          </div>

          <p className='banner__description'>
            {movie.overview}
          </p>
        </div>
        {/* 배너 밑부분 뿌연부분을 위한 디브 */}
        <div className='banner__fadeBottom' />
      </div>
    )
  } else {  // Play 버튼 클릭 됐을 땐 유튜브 영상 보여주기
    return (
      <Container>
        <HomeContainer>
          {/* 
            유튜브 비디오 가져오기 위해 아이프레임(inline frame) 사용 
            다른 HTML 페이지를 현재 페이지에 포함시키는 중첩된 브라우저,
            iframe 요소 이용하면 해당 웹 페이지 안에 어떠한 제한 없이 다른 페이지를 불러와서 삽입 가능
          */}
          <Iframe 
            src={
              // 옵션 - 컨트롤바 없이 자동재생되고, 반복재생되며 음소거된 상태로 시작됨
              `https://www.youtube.com/embed/${movie.videos?.results[0]?.key}?controlls=0&autoplay=1&loop=1&mute=1`
            }
          >
          </Iframe>
        </HomeContainer>
      </Container>
    )
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 90%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;


export default Banner;
