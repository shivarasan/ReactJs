import React, {Component} from 'react';
import {Row,Col,Well,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends Component {
    handleCart(){
        const book= {
            _id:this.props.data._id,
            title:this.props.data.title,
            description: this.props.data.description,
            price:this.props.data.price,
            quantity:1,
        }
        console.log(this.props.cart.length);
        if(this.props.cart.length > 0) {
            // CART IS NOT EMPTY
            let _id = this.props.data._id;
            console.log(_id)
            let cartIndex = this.props.cart.findIndex(function(cart){
              return cart._id === _id;
            })
            // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
            if (cartIndex === -1){
              this.props.addToCart(book);
            } else {
              // WE NEED TO UPDATE QUANTITY
              this.props.updateCart(_id, 1, this.props.cart);
            }
      
          } else {
            // CART IS EMPTY
            this.props.addToCart(book);
          }
    }
    render(){
        return (
            <Well>
                <Row>
                    <Col xs={12}>
                    <h6> {this.props.data.title}</h6>
                    <p> {this.props.data.description}</p>
                    <h6>usd. {this.props.data.price}</h6>
                    <Button onClick={this.handleCart.bind(this)}bsStyle='primary'>Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}
function mapDispatchToProps(dispatch){
    return{
        addToCart:(cart) => dispatch(addToCart(cart)),
        updateCart:(_id, quantity,cart) => dispatch(updateCart(_id, quantity, cart))
    }
}
function mapStateToProps(state){
    return {
        cart: state.carts.cart
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookItem);