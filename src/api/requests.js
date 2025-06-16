// 비동기 요청에 필요한 API 경로들 정리
const requests = {
    // 현재 상영중인 영화 가져올 때는 이 경로
    fetchNowPlaying: "movie/now_playing",
    // 트랜디한 영화 가져올 때
    fetchTrending: "trending/all/week",
    // 평점 가장 좋은 영화 가져올 때
    fetchTopRated: "movie/top_rated",
    // 액션 장르 영화 (장르 ID: 28)
    fetchActionMovies: "discover/movie?with_genres=28",
    // 코미디 = 35
    fetchComedyMoives: "discover/movie?with_genres=35",
    // 호러 = 27
    fetchHorrorMovies: "discover/movie?with_genres=27",
    // 로맨스 = 10749
    fetchRomanceMoives: "discover/movie?with_genres=10749",
    // 다큐 = 99
    fetchDocumentaries: "discover/movie?with_genres=99",
}

// 내보내기
export default requests;