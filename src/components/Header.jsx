import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const foi = await getUser();
    console.log(foi.name);
    this.setState({
      loading: foi.name,
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <header data-testid="header-component">
        { !loading ? <Loading /> : (
          <h1 data-testid="header-user-name">
            {`Olá, ${loading}`}
          </h1>)}
      </header>
    );
  }
}

export default Header;
