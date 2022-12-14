import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    nameSearch: '',
    btnSearch: true,
  };

  hendleValidation = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.checkField);
  };

  checkField = () => {
    const { nameSearch } = this.state;
    const valid = 2;

    this.setState({
      btnSearch: nameSearch.length < valid,
    });
  };

  render() {
    const { btnSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="nameSearch"
            id="name-search"
            data-testid="search-artist-input"
            placeholder="Pesquise artistas ou musicas"
            onChange={ this.hendleValidation }
          />
          <input
            type="button"
            value="Pesquisar"
            data-testid="search-artist-button"
            disabled={ btnSearch }
          />
        </form>
      </div>
    );
  }
}

export default Search;
