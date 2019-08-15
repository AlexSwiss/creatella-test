import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

 
class Ads extends Component {

    Image(Image) {
        Image = 'url("/ads/?r=' + Math.floor(Math.random()*1000) + '")'
        return Image;
    }

    //const url =
    render() {
        return(
            <div>
                <p></p>
                 <Jumbotron>
                    <h1 className="display-16">Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</h1>
                    <hr className="my-2" />
                    <p>But first, a word from our sponsors:</p>
                    <p className="lead">
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default Ads;