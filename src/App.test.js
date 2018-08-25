import ReactDOM from 'react-dom';
import { app } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
