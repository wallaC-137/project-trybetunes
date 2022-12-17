import React from 'react';
import PropType from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
  };

  myFavorite = async (param) => {
    this.setState({ load: true });
    await addSong(param);
    this.setState({ load: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { load } = this.state;

    return (
      <div>
        { load && <Loading />}
        <p>{trackName }</p>
        {trackName && (
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>)}
        { trackId && (
          <label htmlFor={ trackId }>
            <input
              type="checkbox"
              name="favorite"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => this.myFavorite({ trackName, previewUrl }) }
            />
            Favorita
          </label>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropType.string,
  previewUrl: PropType.string,
}.isRequired;

export default MusicCard;
