import React, { Component } from 'react';

class itemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        let url = "http://localhost:3000/api/products"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let products = data.map((product, id) => {
                    return (
                        <div key={id}>
                            <h3>{product.face}</h3>
                            <h3>{product.size}</h3>
                            <h3>{product.price}</h3>
                            <h3>{product.date}</h3>
                        </div>
                    )
                })
                    this.setState({products: products});
            })
    }
    render() {
        return (
            <div className="App">
                {this.state.products}
            </div>
        );
    }
}


export default itemList;