import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    load: true,
    result: [],
  };

  async componentDidMount() {
    this.recoverySaves();
  }

  recoverySaves = async () => {
    const resultApi = await getFavoriteSongs();

    this.setState({
      result: resultApi,
      load: false,
    });
  };

  render() {
    const { load, result } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { load && <Loading /> }
        { (result || []).map((music) => (<MusicCard
          key={ music.trackId }
          { ...music }
          recoverySaves={ this.recoverySaves }
          isTrue
          isFavorite
        />))}
      </div>
    );
  }
}

export default Favorites;
