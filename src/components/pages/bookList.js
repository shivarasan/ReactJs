import React,{ Component }  from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import { getBooks } from '../../actions/booksActions';
import { Grid,Row,Button,Col } from 'react-bootstrap';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';

class BookList extends Component{
    componentDidMount(){
        this.props.getBooks();
        console.log('123')
    }
    render(){
        const books = this.props.book.map((item, i) => {
            return (
                <Col xs={12} sm={6} md={4} key={i}>
                <BookItem data={item}/>
                </Col>
            )
        });
        return (
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row>
                <Col xs={12} sm={6}>
                <BookForm/>
                </Col>
                {books}
                </Row>
            </Grid>
        )
    }
}
function mapStateToProps(state){
    return {
        book: state.books.books
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getBooks:() => dispatch(getBooks())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);