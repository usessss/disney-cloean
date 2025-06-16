// HTTP 요청(GET, POST 등)을 쉽게 보내기 위해 axios 라이브러리를 불러옴
import axios from "axios";

// axios에서 인스턴스 만들기위해 제공해주는 메서드 create
const axiosInstance = axios.create({
    // 인스턴스 만들 때 넣어주고 싶은 옵션들 이 안에 넣어주면 됨
    // 중복되는 url 넣어주기
    baseURL: "https://api.themoviedb.org/3",
    params: {
        // TMDB 사이트에서 발급 받은 API키 넣기
        api_key: "0e3f9175fd3dc4cf51949658e63536fd",
        language: "ko-KR",
    }
})

// 다른 컴포넌트에서도 사용할 수 있게 내보내기
export default axiosInstance;