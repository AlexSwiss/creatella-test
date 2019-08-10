import React, { Component } from 'react';
import { Container, Row, Col, Button, Card } from 'reactstrap';


class itemList extends Component {
    constructor() {
        super();
        this.state = {
            'products': []
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        let url = "http://localhost:3000/api/products/"
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({'products': res}));
    }
    render() {
        return(
            <Container>
                <Row>
                    <Col>
                    {this.state.products.map(function(product, id) {
                    return (
                        <Card body outline color="success">
                            <Container>
                                <Row>
                                    <Col>
                                        <h3>{product.face}</h3>
                                    </Col>
                                    <Col>
                                        <h5><span>Price:</span> ${product.price}</h5>
                                    </Col>
                                    <Col>
                                        <h5><span>Size</span> {product.size} px </h5>
                                    </Col>
                                    <Col>
                                        {product.date}
                                    </Col>
                                    <Col>
                                        <Button color="success">Buy</Button>                                        
                                    </Col>
                                </Row>
                            </Container>
                            </Card>
                                                )
                            }
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default itemList;