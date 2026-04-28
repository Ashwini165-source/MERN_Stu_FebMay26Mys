import { Component } from "react";
import {React} from "react";

export class ClassComponentState extends Component{
    //Constrctor: runs once when component is first created 
    constructor(props){
        super(props);//calls parent constructor first
        this.state = {count: 0 }; //state is going to be here and stays even after the re-renders
    }
    //2.Event handler: arrow function to handle 'this' binding
    increment = () => {
        this.setState((prev))
    }