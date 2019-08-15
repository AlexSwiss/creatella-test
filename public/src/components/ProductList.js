import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Container, Row, Col, Button, Card, Spinner, Alert  } from 'reactstrap';
import centsToCurrency from 'cents-to-currency';



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

//fetch all products from the api
loadProducts () {
  const { limit, page, products, sort } = this.state;
  const url = `http://localhost:3000/api/products?_page=${page}&_limit=${limit}&_sort=price`;
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

//function to load more products from api
loadMore() {
  this.setState(
    prevState => ({
      page: prevState.page + 1,
      scrolling: true
    }),
    this.loadProducts
  );
};

//load more products from the api on using the iScroll event listener
handleScroll(){ 
  var lastLi = document.querySelector("ul.container > li:last-child");
  var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
  var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastLiOffset) {
       this.loadMore();
  }
};

componentWillMount() {
  this.loadProducts();
}

componentDidMount() {
  this.refs.iScroll.addEventListener("scroll", () => {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
      this.loadMore();
    }
  });
}

/*timeDifference(current, previous) {
    
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  
  var elapsed = current - previous;
  
  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds ago';   
  }
  
  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }
  
  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
       return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
  }
  
  else if (elapsed < msPerYear) {
       return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
  }
  
  else {
       return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
  }

}*/




//function to convert cents to currency
centsToCurrency(price){
  return price;
}
  
  render() {
    return (
      <div
      ref="iScroll"
      style={{ height: "600px", overflow: "auto" }}
      >

      <Alert color="success">
        <h2 style={{paddingLeft: '450px'}}>Product List</h2>
      </Alert>
      
      <Container>      
                <Row>
                    <Col>
                    {this.state.products.map(function(product, id) {
                    return (
                        <Card body outline color="success">
                            <Container>
                                <Row>
                                    <Col>
                                        <span style={{fontSize: product.size}}>{product.face}</span>
                                    </Col>
                                    <Col>
                                        <h5>
                                          <span>Price:</span> {centsToCurrency(product.price)}
                                        </h5>
                                    </Col>
                                    <Col>
                                        <h5><span>Size:</span> {product.size} px </h5>
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
        <Row>
          <Col sm="12" md={{ size: 6, offset: 5 }}><Spinner color="success" /></Col>
        </Row>
    </div>  
    );
  }
}
export default ItemList;