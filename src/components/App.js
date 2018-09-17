import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Jumbotron, Form } from 'reactstrap';

import {
  LoginFormContainer,
  FormPanelContainer,
  ButtonPanelContainer,
  TodoListContainer
} from '../containers';
import '../style.css';

export class App extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  renderLoginPanel() {
    return (
      <div>
        <h5>Please Login:</h5>
        <LoginFormContainer />
      </div>
    );
  }

  renderTodoPanel() {
    return (
      <div>
        <TodoListContainer />
        <Form
          className='p-4'
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <FormPanelContainer />
          <ButtonPanelContainer />
        </Form>
      </div>
    );
  }

  render() {
    const { loggedIn, error } = this.props;
    return (
      < Row >
        <Col
          lg={{ size: 6, offset: 3 }}
          md={{ size: 8, offset: 2 }}
          sm={{ size: 10, offset: 1 }}
          xs='12'
        >
          <Jumbotron>
            <div className='d-flex flex-column'>
              <div className='d-flex justify-content-center align-items-center p-4'>
                <h2>My Todos</h2>
              </div>
              {loggedIn ? this.renderTodoPanel() : this.renderLoginPanel()}
              <span className='text-danger'>{error}</span>
            </div>
          </Jumbotron>
        </Col>
      </Row >
    );
  }

}
