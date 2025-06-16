import React from 'react'
import './Modal.css';

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

  // 모달 외부 클릭 시 닫기 위한 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    // role 속성: 웹 접근성 높이기 위해 요소의 용도(역할) 를 설명해주는 속성
    // 화면 전체 덮는 배경
    <div className='presentation' role='presentation'>
      {/* 모달을 가운데로 정렬하는 감싸는 박스 */}
      {/* 배경 클릭 시 모달이 닫히도록 onClick 이벤트 추가 */}
      <div 
        className='wrapper-modal'
        onClick={handleCloseModal}
      >
        {/* 실제 내용이 들어가는 모달창 본체 (여기에 텍스트, 버튼, 영화 정보 등등!) */}
        {/* 
          모달 컨텐츠 자체 클릭했을 땐 이벤트가 배경으로 전파(버블링)되지 않도록 막아줌 
          -> 이렇게 해야 모달 안의 내용을 클릭해도 모달창 닫히지 않음
        */}
        <div 
          className='modal'
          onClick={(e) => e.stopPropagation()}
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
