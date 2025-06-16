import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios';
import './Row.css';
import Modal from './Modal';

// App.js에 있는 title && id && fetchUrl props로 가져오기
const Row = ({ title, id, fetchUrl }) => {
  // 2. 데이터 기억하기 위해 스테이트 만들기
  const [movies, setMovies] = useState([]);

  // 모달을 위한 스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal 컴포넌트에 props로 movie 객체 전달해주기 위한 스테이트
  // 여기저기서 쓰고, 변경도 자주 되는 데이터면 → state에 넣기!
  const [movieSelected, setMovieSelected] = useState({});

  // 1. Row의 각각 필요한 데이터를 위해 비동기로 요청보내기
  useEffect(() => {
    async function fetchMovieData() {
      const response = await axiosInstance.get(fetchUrl);
      console.log(response.data.results);
      setMovies(response.data.results);
    }
    fetchMovieData();
  }, [fetchUrl]);  // fetchUrl이 바뀔 때마다 다시 호출

  // Row에서 각 이미지를 클릭했을 때 해당 영화 정보를 모달에 띄우기 위한 함수  
  // 여러 영화 중 어떤 걸 클릭하느냐에 따라 다른 영화 정보가 필요하므로  
  // 클릭한 영화 객체(movie)를 매개변수로 받아 처리함
  const handleClick = (movie) => {
    setIsModalOpen(true);  // 이미지 클릭했을 때 모달 열리게 true 상태 변경
    setMovieSelected(movie);
  }

  return (
    // 3. 요청 보내고 기억해줬으니 가져온 데이터를 화면에서 보여주기
    <div>
      <h2>{title}</h2>

      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            // 클릭하면 id값에 해당하는 요소를 찾아서
            // 왼쪽으로 (화면 너비 + 80px) 만큼 스크롤 이동시킴
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth + 80;
            }}
          >
            {"<"}
          </span>
        </div>

        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img  
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>

        <div className='slider__arrow-right'>
          <span className='arrow'
            // 클릭하면 id값에 해당하는 요소를 찾아서
            // 오른쪽으로 (화면 너비 - 80px) 만큼 스크롤 이동시킴
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {
        // isModalOpen이 true일 때만 <Modal /> 컴포넌트를 화면에 보여줌  
        // false이면 아무것도 렌더링하지 않고 null 반환 (화면에 안 보임)
        isModalOpen ?
        <Modal  
          // movieSelected={movieSelected} 
          {...movieSelected}
          // 부모 컴포넌트의 setIsModalOpen 함수를 자식 Modal 컴포넌트에 넘겨서
          // 모달 안에서도 닫기 기능을 쓸 수 있게 함
          setIsModalOpen={setIsModalOpen}
        />
        :
        null
      }
    </div>
  )
}

export default Row;
