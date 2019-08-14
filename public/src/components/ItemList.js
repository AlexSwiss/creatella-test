import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Container, Row, Col, Button, Card, Spinner } from 'reactstrap';


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

/*sortByPrice () {
  const { limit, page, sortByPrice } = this.state;
  const url = `http://localhost:3000/api/products?_page=${page}&_limit=${limit}&_sort=price`;
     fetch(url)
    .then(res => res.json())
    .then(res =>
     this.setState({
          sortByPrice: [...sortByPrice, ...res],
          scrolling: false,
          total_pages: sortByPrice.total_pages
    })
 );
}*/


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

timeDifference(current, previous) {

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
}
  
  render() {
    return (
      <div
      ref="iScroll"
      style={{ height: "600px", overflow: "auto" }}
      >
      <h1>Products Grid</h1>

      <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

      <p>But first, a word from our sponsors:</p> 
      <script>document.write(`<img class="ad" src="/ads/?r=' + Math.floor(Math.random()*1000) + '"/>`);</script>

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
        <Row>
          <Col sm="12" md={{ size: 6, offset: 5 }}><Spinner color="success" /></Col>
        </Row>
    </div>  
    );
  }
}
export default ItemList;