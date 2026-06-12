import {useState} from 'react';
export default function AuthStatus(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <section>
            <h2>Authentication Status</h2>
            <p>
                Current status:
                 {
                 isLoggedIn ? "Logged in" : "Guest User"
                 }
                 </p>
                 <button onClick={()=>{
                    setIsLoggedIn(!isLoggedIn);
                 }}>
                    {isLoggedIn ? "Logout" : "Login"}

                 </button>
        </section>
        
    );
}