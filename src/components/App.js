import React, { Component } from 'react';
import { Row, Col, Jumbotron, Form } from 'reactstrap';

import {
  LoginFormContainer,
  FormPanelContainer,
  ButtonPanelContainer,
  TodoListContainer
} from '../containers';
import '../style.css';

export class App extends Component {
  renderLoginPanel = () => (
    <div>
      <h5>Please Login:</h5>
      <LoginFormContainer />
    </div>
  );

  renderTodoPanel = () => (
    <div>
      <TodoListContainer />
      <Form
        className='padding'
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <FormPanelContainer />
        <ButtonPanelContainer />
      </Form>
    </div>
  );

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
            <div className='flexColumn'>
              <div className='flexCenter padding'>
                <h2>My Todos</h2>
              </div>
              {loggedIn ? this.renderTodoPanel() : this.renderLoginPanel()}
              <span className='redText'>{error}</span>
            </div>
          </Jumbotron>
        </Col>
      </Row >
    );
  }

}
