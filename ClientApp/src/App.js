import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { AuthorList } from './components/Pages/Authors/AuthorList';
import { CreateAuthor } from './components/Pages/Authors/CreateAuthor';
import { EditAuthor } from './components/Pages/Authors/EditAuthor';
import { DetailAuthor } from './components/Pages/Authors/DetailAuthor';
import { DeleteAuthor } from './components/Pages/Authors/DeleteAuthor';
import { BookList } from './components/Pages/Books/BookList';
import { CreateBook } from './components/Pages/Books/CreateBook';
import { EditBook } from './components/Pages/Books/EditBook';
import { DetailBook } from './components/Pages/Books/DetailBook';
import { DeleteBook } from './components/Pages/Books/DeleteBook';

import { AddAuthorToBook } from './components/Pages/BookAuthors/AddAuthorToBook';
import { DeleteBookAuthor } from './components/Pages/BookAuthors/DeleteBookAuthor';

import { CategoryList } from './components/Pages/Categories/CategoryList';
import { CreateCategory } from './components/Pages/Categories/CreateCategory';
import { EditCategory } from './components/Pages/Categories/EditCategory';
import { DetailCategory } from './components/Pages/Categories/DetailCategory';
import { DeleteCategory } from './components/Pages/Categories/DeleteCategory';
import { PublisherList } from './components/Pages/Publishers/PublisherList';
import { CreatePublisher } from './components/Pages/Publishers/CreatePublisher';
import { EditPublisher } from './components/Pages/Publishers/EditPublisher';
import { DetailPublisher } from './components/Pages/Publishers/DetailPublisher';
import { DeletePublisher } from './components/Pages/Publishers/DeletePublisher';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
        <Route path='/authorList' component={AuthorList} />
        <Route path='/createAuthor' component={CreateAuthor} />
        <Route path='/editAuthor/:id' component={EditAuthor} />
        <Route path='/deleteAuthor/:id' component={DeleteAuthor} />
        <Route path='/detailAuthor/:id' component={DetailAuthor} />

        <Route exact path='/' component={BookList} />
        <Route path='/createBook' component={CreateBook} />
        <Route path='/editBook/:id' component={EditBook} />
        <Route path='/deleteBook/:id' component={DeleteBook} />
        <Route path='/detailBook/:id' component={DetailBook} />

        <Route path='/addAuthorToBook/:id' component={AddAuthorToBook} />
        <Route path='/deleteBookAuthor/:id/:idd' component={DeleteBookAuthor} />

        <Route path='/categoryList' component={CategoryList} />
        <Route path='/createCategory' component={CreateCategory} />
        <Route path='/editCategory/:id' component={EditCategory} />
        <Route path='/deleteCategory/:id' component={DeleteCategory} />
        <Route path='/detailCategory/:id' component={DetailCategory} />

        <Route path='/publisherList' component={PublisherList} />
        <Route path='/createPublisher' component={CreatePublisher} />
        <Route path='/editPublisher/:id' component={EditPublisher} />
        <Route path='/deletePublisher/:id' component={DeletePublisher} />
        <Route path='/detailPublisher/:id' component={DetailPublisher} />        
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
