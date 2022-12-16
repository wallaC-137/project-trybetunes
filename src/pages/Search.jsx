import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCap from '../components/AlbumCap';

class Search extends React.Component {
  state = {
    nameSearch: '',
    btnSearch: true,
    load: false,
    api: [],
    artista: '',
    aa: '',
  };

  handleValidation = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.checkField);
  };

  checkField = () => {
    const { nameSearch } = this.state;
    const valid = 2;

    this.setState({
      btnSearch: nameSearch.length < valid,
    });
  };

  handleBtnSearch = async () => {
    const { nameSearch } = this.state;
    const resultApi = await searchAlbumsAPI(nameSearch);

    this.setState({ load: true });

    const ab = resultApi.length > 0;

    this.setState({
      aa: ab ? '' : 'Nenhum álbum foi encontrado',
      artista: nameSearch || '',
      nameSearch: '',
      api: resultApi,
      load: false,
    });
  };

  render() {
    const { btnSearch, nameSearch, load, api, artista, aa } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { load ? <Loading /> : (
          <form>
            <input
              type="text"
              name="nameSearch"
              id="name-search"
              value={ nameSearch }
              data-testid="search-artist-input"
              placeholder="Pesquise artistas ou musicas"
              onChange={ this.handleValidation }
            />
            <input
              type="button"
              value="Pesquisar"
              data-testid="search-artist-button"
              disabled={ btnSearch }
              onClick={ this.handleBtnSearch }
            />
          </form>)}
        { (artista && <p>{`Resultado de álbuns de: ${artista}`}</p>) }
        <p>
          {
            aa || api.map((a, idx) => (<AlbumCap
              key={ idx }
              nome={ a.collectionName }
              imagem={ a.artworkUrl100 }
              artista={ a.artistName }
              collectionId={ a.collectionId }
            />))
          }
        </p>
      </div>
    );
  }
}

export default Search;
