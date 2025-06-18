import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';

const DetailPage = () => {
  // 2. 데이터 기억하기 위해 state에 넣어주기
  const [movie, setMovie] = useState(null);

  // useParams 훅을 사용해서 URL 안에 있는 파라미터 값을 가져옴
  // 예: URL이 /movie/123 이라면 movieId는 '123'이 됨

  // 이렇게 구조 분해 할당(destructuring)을 하면
  // const params = useParams(); const movieId = params.movieId; 를 한 줄로 쓴 것과 같음
  const { movieId } = useParams(); 

  // 1. 상세 영화에 대한 데이터 받아오기
  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      )
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  // 3. 화면에서 보여주기

  // 렌더링 순서 : state -> return 부분 -> useEffect 부분 이라서 
  // state에 movie의 초기 값이 첨에 null이므로 조건 처리 해주기
  if (!movie) return (
    <div>
      loading...
    </div>
  )
  // movie 데이터 가져왔을 땐
  return (
     <section>
      <img 
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='detailed movie'
      />
     </section>
  )
}

export default DetailPage;
