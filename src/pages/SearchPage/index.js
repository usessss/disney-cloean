import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import '../../pages/SearchPage/SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {

  // ✅ useLocation : ?q=xxx 같은 "쿼리" 파라미터를 가져올 때 사용 
  // localhost:3000/search?q=spiderman → spiderman 값은 useLocation + URLSearchParams로 가져옴
  // localhost:3000/movie/123 → 123 같은 경로 값은 useParams로 가져옴

  // 3. state (데이터 기억하기)
  const [searchResults, setSearchResults] = useState([]);

  // 각 영화 클릭 시 해당 상세페이지로 이동할 수 있도록 useNavigate 훅으로 navigate 함수 생성
  const navigate = useNavigate();

  // 1. spiderman
  const useQuery = () => {
    // 현재 URL의 쿼리 문자열을 파싱해서 검색할 수 있게 만듦 (ex. ?q=spiderman)
    return new URLSearchParams(useLocation().search);
  }
 
  // 위에서 만든 훅을 호출해서 query 객체를 얻음
  let query = useQuery();
  // 쿼리 문자열 중에서 'q'에 해당하는 값을 가져옴 (ex. spiderman)
  const searchTerm = query.get("q");
  // searchTerm: 내가 검색창에 타이핑한 값을 useDebounce에 넘김 (value 매개변수로 들어감)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);  // ✅ 500ms = 0.5초

  // 2. 요청 -> 응답 (spiderman에 관련된 데이터 요청 하고 응답 받기)
  useEffect(() => {
    // 인풋에 값이 있을 때만 함수 호출
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);  // 인풋 값이 변경되면 다시 함수 호출

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axiosInstance.get(
        // searchTerm 값으로 영화/TV 등 통합 검색 요청 (성인 콘텐츠 제외)
        /*
          /search/multi → 영화, TV 프로그램 등 여러 카테고리 통합 검색
          include_adult=false → 성인 콘텐츠 결과는 제외
          query=${searchTerm} → 사용자가 입력한 검색어로 검색 수행
        */
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      // 서버 응답(response)에서 실제 검색 결과 배열(results)만 꺼내서 상태에 저장
      setSearchResults(response.data.results);
      console.log("response", response.data.results);
    } catch(error) {
      console.error(error);
    }
  }

  // 4. 화면에 보여주기
  // 데이터가 있으면
  if (searchResults.length > 0) {
    return (
      // 🔹 검색 결과 전체를 감싸는 영역
      <section className='search-container'>
        {/* 조건 처리 해주기 위해 중괄호 {} 사용 */}
        {/* 🔸 map 돌면서 결과 하나씩 렌더링 */}
        {searchResults.map(movie => {
          // backdrop_path가 null이면 포스터가 없는 것도 있음(그래서 생략하기 위해 조건 넣어줌)
          // media_type이 'person'이면 배우/감독 정보라서 영화/TV 포스터가 아니므로 제외
          if(movie.backdrop_path !== null && movie.media_type !== 'person') {

            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;

            return (
              // 🔹 개별 영화 하나를 감싸는 영역
              <div className='movie' key={movie.id}>
                {/* 🔸 포스터 전체를 감싸는 영역 (클릭 영역) → 클릭 시 상세 페이지 이동 */}
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className='movie__column-poster'
                >
                  {/* 🔸 실제 영화 포스터 이미지 */}
                  <img 
                    src={movieImageUrl}
                    alt='movie'
                    className='movie__poster'
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  } else {  // 찾고자 하는 영화 데이터가 없을 때
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }
}

export default SearchPage;
