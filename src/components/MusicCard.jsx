import React from 'react';
import PropType from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
    favoriteState: false,
  };

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      favoriteState: isFavorite,
    });
  }

  myFavorite = async (param) => {
    const { favoriteState } = this.state;

    this.setState({ load: true });
    if (favoriteState) await addSong(param);
    if (!favoriteState) await removeSong(param);
    this.setState({ load: false });
  };

  handleSaveState = ({ target: { checked } }) => {
    const { trackName, previewUrl, trackId, isTrue, recoverySaves } = this.props;
    this.setState({
      favoriteState: checked,
    }, async () => {
      this.myFavorite({ trackName, previewUrl, trackId });
      if (isTrue) await recoverySaves();
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
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
              checked={ favoriteState }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleSaveState }
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
