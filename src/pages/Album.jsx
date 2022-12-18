import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musics: [],
    nameArt: '',
    albumArt: '',
    load: true,
    favorits: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);
    const checkFav = await this.checkFavorite();

    this.setState({
      musics: resultApi,
      nameArt: resultApi[0].artistName,
      albumArt: resultApi[0].collectionName,
      load: false,
      favorits: checkFav,
    });
  }

  async componentDidUpdate() {
    const checkFav = await this.checkFavorite();
    this.setState({
      favorits: checkFav,
    });
  }

  checkFavorite = async () => {
    const resultGetFav = await getFavoriteSongs('favorite_songs');
    return resultGetFav;
  };

  render() {
    const { musics, nameArt, albumArt, load, favorits } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        <div>
          <h2 data-testid="artist-name">{nameArt}</h2>
          <h3 data-testid="album-name">{albumArt}</h3>
        </div>

        { load && <Loading />}

        { musics.map((music, idx) => (
          <MusicCard
            key={ idx }
            { ...music }
            isFavorite={ favorits.some((fav) => fav.trackName === music.trackName) }
          />)) }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropType.string,
}.isRequired;

export default Album;
