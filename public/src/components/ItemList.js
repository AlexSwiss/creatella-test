import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Container, Row, Col, Button, Card } from 'reactstrap';


class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        products: [],
        limit: 20,
        page: 1,
        total_pages: null,

    };
}

loadUser () {
  const { limit, page, products, sort } = this.state;
  const url = `http://localhost:3000/api/products?_page=${page}&_limit=${limit}`;
     fetch(url)
    .then(res => res.json())
    .then(res =>
     this.setState({
          products: [...products, ...res],
          scrolling: false,
          total_pages: products.total_pages
    })
 );
}


loadMore() {
  this.setState(
    prevState => ({
      page: prevState.page + 1,
      scrolling: true
    }),
    this.loadUser
  );
};

handleScroll(){ 
  var lastLi = document.querySelector("ul.container > li:last-child");
  var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
  var pageOffset = window.pageYOffset + window.innerHeight;
if (pageOffset > lastLiOffset) {
       this.loadMore();
  }
};

componentWillMount() {
  this.loadUser();
}

componentDidMount() {
  this.refs.iScroll.addEventListener("scroll", () => {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
      this.loadMore();
    }
  });
}
  
  render() {
    return (
      <div
      ref="iScroll"
      style={{ height: "600px", overflow: "auto" }}
      >
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
                            
                                );
                            }
                        )}
                    </Col>
                </Row>
            </Container>
<p><h4>Loading...</h4></p>
    </div>  
    );
  }
}
export default ItemList;