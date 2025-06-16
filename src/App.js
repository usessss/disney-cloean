import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
  return (
    <div>
      {/* 항상 보여져야 되는 부분 -> 네비게이션 바 */}
      <Nav />
      {/* <Outlet />: 부모 컴포넌트에서 자식 컴포넌트가 렌더링될 위치를 지정하는 필수 요소 */}
      <Outlet />
    </div>
  )
}

/*
  Routes : 앱에서 생성될 모든 개별 경로에 대한 컨테이너/상위 역할을 함
  Route로 생성된 자식 컴포넌트 중에서 매칭되는 첫번째 Route를 렌더링 해줌

  Route : 단일 경로를 만드는 데 사용
  - path는 원하는 컴포넌트의 URL 경로를 지정함
    이 경로 이름을 원하는 대로 정할 수 있음
  - element :  경로에 맞게 렌더링돼야 하는 컴포넌트를 지정
*/
function App() {
  return (
    <Routes>
        {/* 
          index 라우트: 부모 라우트의 경로와 정확히 일치할 때 보여줄 기본 자식 페이지를 의미
          중첩 구조: <Route> 안에 다른 <Route>를 넣어 부모-자식 관계를 만듦
        */}
        <Route path='/' element={<Layout />} >
          <Route index element={<LoginPage />} />
          <Route path='main' element={<MainPage />} />
          {/* 
            :movieId -> 동적 경로 파라미터
            ex ) 사용자가 '/movies/123' 으로 들어오면 movieId는 123 값 갖게됨
            이 값은 DetailPage 컴포넌트 안에서 useParams()를 통해 가져올 수 있음 
          */}
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
    </Routes>
  );
}


export default App;
