import React from 'react';
import PropType from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    btn: true,
    name: '',
    loading: false,
  };

  handleSaveState = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.checkField);
  };

  checkField = () => {
    const { name } = this.state;
    const validation = 3;

    this.setState({
      btn: name.length < validation,
    });
  };

  lsSaveName = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name });
    history.push('/search');
  };

  render() {
    const { btn, loading } = this.state;

    return (
      <div data-testid="page-login">
        { loading && <Loading />}
        <form>
          <label htmlFor="name">
            nome:
            <input
              type="text"
              name="name"
              id="name"
              data-testid="login-name-input"
              onChange={ this.handleSaveState }
            />
          </label>
          <input
            type="button"
            value="Entrar"
            data-testid="login-submit-button"
            disabled={ btn }
            onClick={ this.lsSaveName }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropType.shape({
    push: PropType.func,
  }),
}.isRequired;

export default Login;
