import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory,hashHistory } from 'react-router';

import reducers from './reducers/index';
import BookList from './components/pages/bookList';
import BooksForm from './components/pages/bookForm';
import Cart from './components/pages/cart';
import Main from './main'

const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers, middleware);

// store.subscribe(function() {
//     console.log('current state is:', store.getState());
// })
// render(
//     <BookList />, document.getElementById('app')
// );
const Routes = (
  <Provider store={store}>
  <Router history={browserHistory}>
  <Route path='/' component={Main}>
  <IndexRoute component={BookList}/>
  <Route path='/admin' component={BooksForm}/>
  <Route path='/cart' component={Cart}/>
  </Route>
  </Router>
  </Provider>
)
ReactDOM.render(
    Routes, document.getElementById('app')
  );

// store.dispatch({ type:"POST_BOOK", payload:[{
//     id:1,
//     title: 'this is book title',
//     description: 'this is book description',
//     price: 33.20
// },
// {
//     id:2,
//     title: 'this is book title',
//     description: 'this is book description',
//     price: 33.20
// }] })

// store.dispatch({ type:"UPDATE_BOOK", payload:{ id:1, title: 'redux tutorial', description: 'good tutorial', price:50 }})
// store.dispatch({ type:"ADD_TO_CART", payload:{ id:1 }})