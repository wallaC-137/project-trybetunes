import React from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musics: [],
    nameArt: '',
    albumArt: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);

    this.setState({
      musics: resultApi,
      nameArt: resultApi[0].artistName,
      albumArt: resultApi[0].collectionName,
    });
  }

  render() {
    const { musics, nameArt, albumArt } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        <div>
          <h2 data-testid="artist-name">{nameArt}</h2>
          <h3 data-testid="album-name">{albumArt}</h3>
        </div>

        { musics.map((music, idx) => <MusicCard key={ idx } { ...music } />) }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropType.string,
}.isRequired;

export default Album;
