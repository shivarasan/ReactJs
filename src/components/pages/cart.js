import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup,Label } from 'react-bootstrap';
import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends Component {
    constructor(){
        super();
        this.state ={
            showModal: false,
        }
    }
    
  onDelete(_id){
    const currentBookToDelete = this.props.cart;
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete);
  }
  inCrement(id){
    this.props.updateCart(id,1,this.props.cart);
  }
  onDecrement(_id, quantity){
    // if(quantity > 1){
      this.props.updateCart(_id, -1, this.props.cart);
    // }
  }
  open(){
      this.setState({ showModal: true });
  }
  close(){
      this.setState({ showModal:false });
  }

    render() {
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return(
            <div></div>
        )
    }
    renderCart(){
        const cartItemlist = this.props.cart.map((item,i)=>{
            return (
                <Panel key={item._id}>
                <Panel.Body>
                <Row>
                    <Col xs={12} sm={4}>
                    <h6>{item.title}</h6><span>     </span>
                    </Col>
                    <Col xs={12} sm={2}>
                    <h6>{item.price}</h6>
                    </Col>
                    <Col xs={12} sm={2}>
                    <h6>qty.  <Label bsStyle='success'></Label>{item.quantity}</h6>
                    </Col>
                    <Col xs={12} sm={4}>
                    <ButtonGroup style={{minWidth: '300px'}}>
                    <Button bsStyle='default' bsSize='small'disabled={item.quantity=== 1 ? true : false} onClick={this.onDecrement.bind(this,item._id)}>-</Button>
                    <Button bsStyle='default' bsSize='small' onClick={this.inCrement.bind(this,item._id)}>+</Button>
                    <span>       </span>
                    <Button bsStyle='danger' bsSize='small' onClick={this.onDelete.bind(this, item._id)}>DELETE</Button>
                    </ButtonGroup>
                    </Col>
                    </Row>

                    </Panel.Body>
                    </Panel>
            )
        },this);
        return (
            <Panel header="Cart" bsStyle="primary">
            <Panel.Heading>Cart</Panel.Heading>
            <Panel.Body>
            {cartItemlist}
            <Row>
          <Col xs={12}>
            <h6>Total amount: {this.props.totalAmount}</h6>
            <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

            </Panel.Body>
            </Panel>
        )
    }
}
function mapStateToProps(state){
    return {
        cart: state.carts.cart,
        totalAmount: state.carts.totalAmount
    }
}
function mapDispatchToProps(dispatch){
    return {
        deleteCartItem:(cart) => dispatch(deleteCartItem(cart)),
        updateCart:(id,unit,cart) => dispatch(updateCart(id,unit,cart))
    }
}
export default connect(mapStateToProps,mapDispatchToProps ) (Cart);