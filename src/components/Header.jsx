import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const foi = await getUser();

    this.setState({
      loading: foi.name,
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <br />

        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        { !loading ? <Loading /> : (
          <h1 data-testid="header-user-name">
            {`Olá, ${loading}`}
          </h1>)}
      </header>
    );
  }
}

export default Header;
