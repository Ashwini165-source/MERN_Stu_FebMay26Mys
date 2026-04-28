import React,{ Component } from "react";

export class ClassComponentsBasics extends Component{
    //1.Class extends React.Component
    //2.state, lifecycle methods, props, setState()


    render(){
        //render(): returns JSX describing what to show
        //called whenever component needs to update
        return(
            <>
                <h2>Class Components Basics</h2>
                <p>Class Components use render() and support lifecycle methods.</p>
            </>
        )
    }
}