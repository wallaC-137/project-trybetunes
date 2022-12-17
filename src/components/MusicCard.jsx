import React from 'react';
import PropType from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
    favoriteState: false,
  };

  myFavorite = async (param) => {
    this.setState({ load: true });
    await addSong(param);
    this.setState({ load: false });
  };

  handleSaveState = ({ target }) => {
    const { checked } = target;
    this.setState({
      favoriteState: checked,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, isFavorite } = this.props;
    const { load, favoriteState } = this.state;

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
              checked={ favoriteState || isFavorite }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => this.myFavorite({ trackName, previewUrl }) }
              onClick={ this.handleSaveState }
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
  trackId: PropType.string,
  isFavorite: PropType.bool,
}.isRequired;

export default MusicCard;
