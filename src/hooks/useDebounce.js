import { useEffect, useState } from "react"

/* 
    💡 Debounce
    → 사용자가 계속 타이핑할 때마다 검색 요청을 보내지 않고
      입력이 끝날 때까지 잠깐 기다렸다가 한 번만 요청하는 기능!

    예: "spiderman"을 천천히 타이핑할 때
        → s → sp → spi → spid ... 등등 중간중간 API 요청 ❌
        → 마지막 글자까지 다 입력하고 0.5초 동안 멈추면 그때 한 번만 검색 요청 ⭕
*/

// value: input에 타이핑한 값 (searchTerm이 여기로 넘어옴)
// 500ms 넣어줬으니까 이 값을 받아오기-> delay
export const useDebounce = (value, delay) => {
    // debouncedValue: 실제로 "delay 후에" 업데이트 되는 값
    const [debouncedValue, setdebouncedValue] = useState(value);

    // s 기다리는중 => 0.5 => 요청 X
    // sp 기다리는중 => 0.5 => 요청 X
    // spi 기다리는중 => 0.5 => 요청

    // input에 s를 치면 value 값으로 들어오게 되고 debouncedValue에 기본값으로 됨
    useEffect(() => {
      // 타이머 설정: delay 시간이 지난 후에 debouncedValue 업데이트
      const handler = setTimeout(() => {
        setdebouncedValue(value);  // delay 후에 값을 저장함!
      }, delay)  // delay(0.5초)만큼 기다린다음에
     
      // 클린업 함수: useEffect가 다시 실행되기 전에 이전 타이머 제거함
      // 즉, 타이핑 중이면 이전 setTimeout을 무시함!
      return () => {
        clearTimeout(handler); // 이전 타이머 취소
      }
    }, [value, delay]); // value || delay가 바뀔 때마다 다시 실행됨
    
    return debouncedValue;  // 최종적으로 delay 후 확정된 값 반환!
}