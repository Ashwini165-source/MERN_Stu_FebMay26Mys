import './App.css'
// import HomePage from './pages/HomePage'
import MovieCard from './components/MovieCard'
function App() {
  return (
    <>
    // Component Composition
    <MovieCard
      title="Inception"
      genre="Sci-Fi"
      rating={4.8}
      duration="2h 28min"
      poster="https://picsum.photos/200/300?1"
    />

    <MovieCard
      title="Avatar"
      genre="Sci-Fi"
      rating={4.4}
      duration="2h 28min"
      poster="https://picsum.photos/200/300?2"
    />

    <MovieCard
      title="Fight Club"
      genre="Sci-Fi"
      rating={4.8}
      duration="2h 28min"
      poster="https://picsum.photos/200/300?3"
    />
     </>
  );
}

export default App