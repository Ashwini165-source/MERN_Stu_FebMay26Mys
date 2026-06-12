import './App.css'
// import HomePage from './pages/HomePage'
// import MovieCard from './components/MovieCard'
// import CitySelector from './components/CitySelector';
// import MovieSearch from './components/MovieSearch';
import BookButton from './components/BookButton';
import GenreFilter from './components/GenreFilter';
import LoginForm from './components/LoginForm';
import SearchShortcut from './components/SearchShortcut';
function App() {
  return (
    <>
    {/* <CitySelector/> */}
    {/* Controlled Component */}
    {/* <MovieSearch/> */}
    <BookButton/>
    <GenreFilter/>
    <LoginForm/>
    <SearchShortcut/>
     </>
  );
}

export default App