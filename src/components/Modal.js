import React, { useRef } from 'react'
import './Modal.css';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Modal = ({
    // {...movieSelected} 이렇게 해줘서 바로 가져올 수 있는것
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setIsModalOpen
}) => {

  // 📦useRef: "이 HTML 태그가 뭔지 기억하게 해주는 상자" 
  // 일반 JS는 document.querySelector('.modal') 쓰는데 리액트에선 useRef로 함
  const modalRef = useRef(null); 
  console.log(modalRef);  // 출력: Object -> current: null
  // "모달 바깥 클릭하면 setIsModalOpen(false)를 실행해서 모달을 닫아줘!" 라는 뜻
  useOnClickOutside(modalRef, () => setIsModalOpen(false));

  return (
    // role 속성: 웹 접근성 높이기 위해 요소의 용도(역할) 를 설명해주는 속성
    // 화면 전체 덮는 배경
    <div className='presentation' role='presentation'>
      {/* 모달을 가운데로 정렬하는 감싸는 박스 */}
      <div 
        className='wrapper-modal'
      >
        {/* 실제 내용이 들어가는 모달창 본체 (여기에 텍스트, 버튼, 영화 정보 등등!) */}
        {/* 
          이 div 요소를 modalRef 라는 ref 객체에 연결해줌
          => 이렇게 하면 나중에 modalRef.current로 이 div에 직접 접근할 수 있음
          즉, 이 태그가 실제로 어떤 DOM인지 기억하게 해주는 역할

          {current: null}-> {current: div.modal(요소)}로 바꼈어도 리렌더링X
          이유 : ref.current는 그냥 저장소 역할이기 때문, 렌더링 영향 주는 건 state!
        */}
        <div 
          className='modal'
          ref={modalRef}
        >
          <span 
            onClick={() => setIsModalOpen(false)}
            className='modal-close'
          >
            X
          </span>

          <img 
            className='modal__poster-img'
            // backdrop_path : 해당 영화나 드라마의 배경 이미지 경로(가로로 긴 큰 썸네일 이미지)
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt='modal__poster-img'
          />

          <div className='modal__contents'>
            <p
              className='modal__details'
            >
              <span>
                100% for you
              </span>{" "}
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className='modal__title'>
              {title ? title : name}
            </h2>

            <p className='modal__overviews'>
              평점: {vote_average}
            </p>

            <p className='modal__overviews'>
              {overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
