import {useState} from 'react';
export default function MovieLoader(){
    const [isLoading, setIsLoading] = useState(true);
    return (
        <section>
            <h2>Movie Loader</h2>
            {isLoading ? <p>Loading Movies...</p> : <p>Movies Loaded Successfully</p>}
            <button onClick={()=>{setIsLoading(!isLoading);}}>Toggle Loading</button>
            </section>
    );
}