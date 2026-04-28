import React from 'react';
function Welcome(props){
    //Chid component : reusable UI
    return(
        <p>Hello, {props.name}</p>
    );
}

export function FunctionalComponentsBasics() {
  return (
    <div>
        <h2>Functional Components Basics</h2>
        {/* We are passing 'Ashwini' as prop
        Welcome function receives it as {name: "Ashwini"} */}
        <Welcome name="Ashwini" />
        {/* We are passing 'Developer' as prop
        Welcome function receives it as {name: "Developer"} */}
        <Welcome name="Developer" />
    </div>
  );
}
