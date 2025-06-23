import { useEffect } from "react";

// 모달 외부 클릭 시 닫히게 하는 함수 
export default function useOnClickOutside(ref, handler) {
    useEffect(() => {

        const listener = (event) => {
            // ref.current: useRef로 연결한 실제 DOM 요소 (여기선 모달 박스!)
            // - 아직 연결 안 됐으면 null일 수 있으니까 체크 먼저!
            // ref가 없거나, 클릭한 곳이 모달 안쪽이면 모달 닫지말라는 조건 처리
            if(!ref.current || ref.current.contains(event.target)) {
                return;  // 내부 클릭할 때 return으로 끝내기
            }
            
            handler();
        }

        // 모달 눌렀을 때 외부창 닫히게
        document.addEventListener("mousedown", listener);

        // 컴포넌트가 사라질 때 (또는 리렌더링될 때)
        // 이전에 등록한 클릭 이벤트를 제거해줌 (중복 방지 & 메모리 누수 방지)
        return () => {
            document.removeEventListener("mousedown", listener);
        }
    }, [ref, handler]); 
}