import React, { Component } from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import {postBooks, deleteBooks} from '../../actions/booksActions';
let count=2;
class BookForm extends Component {
    handleSubmit(){
        count += 1;
        const book = {
            _id: count,
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
        }
        this.props.postBook(book);
    }
    onDelete(){
        let bookId = findDOMNode(this.refs.delete).value;
    
        this.props.deleteBooks(bookId);
      }
    
    render(){
        const booksList = this.props.books.map(function(booksArr){
            return (
              <option key={booksArr._id}> {booksArr._id}</option>
            )
          })
      
        return (
            <Well>
                <Panel>
                <Panel.Body>
                    <FormGroup controlId='title'>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder='Enter Title'
                        ref='title' />
                    </FormGroup>
                    <FormGroup controlId='Description'>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder='Enter Description'
                        ref='description' />
                    </FormGroup>
                    <FormGroup controlId='Price'>
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder='Enter Price'
                        ref='price' />
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save me</Button>
                    </Panel.Body>
                    </Panel>
                    <Panel>
                    <Panel.Body>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                    {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete.bind(this)} bsStyle="danger" >Delete book</Button>            
</Panel.Body>
</Panel>
                    </Well>

        )
    }
}
function mapDispatchToProps(dispatch){
    return {
        postBook:(book) => dispatch(postBooks(book)),
        deleteBooks:(bookId) => dispatch(deleteBooks(bookId))
    }
}
function mapStateToProps(state){
    return {
        books: state.books.books
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (BookForm);