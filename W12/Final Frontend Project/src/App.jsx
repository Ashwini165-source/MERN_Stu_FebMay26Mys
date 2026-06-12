import './App.css'
// import HomePage from './pages/HomePage'
// import MovieCard from './components/MovieCard'
import CitySelector from './components/CitySelector';
import MovieSearch from './components/MovieSearch';
function App() {
  return (
    <>
    <CitySelector/>
    {/* Controlled Component */}
    <MovieSearch/>
     </>
  );
}

export default App