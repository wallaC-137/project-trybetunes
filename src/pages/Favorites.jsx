import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    load: true,
    result: [],
    favorit: true,
  };

  async componentDidMount() {
    const resultApi = await getFavoriteSongs();
    // const checkFav = await checkFavorite();

    console.log(resultApi);
    this.setState({
      result: resultApi,
      load: false,
      // favorit: true,
    });
  }

  async componentDidUpdate() {
    const resultApi = await getFavoriteSongs();

    this.setState({
      result: resultApi,
      // favorit: true,
    });
  }

  render() {
    const { load, result, favorit } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { load && <Loading /> }
        { (result || []).map((music) => (<MusicCard
          key={ music.trackId }
          { ...music }
          isFavorite={ favorit }
        />))}
      </div>
    );
  }
}

export default Favorites;
