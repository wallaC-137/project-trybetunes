import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCap extends React.Component {
  render() {
    const { nome, imagem, artista, collectionId } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ imagem } alt={ nome } />
        </Link>
        <p>{ nome }</p>
        <h4>{ artista }</h4>
      </div>
    );
  }
}

AlbumCap.propTypes = {
  nome: PropType.string,
  imagem: PropType.string,
  artista: PropType.string,
}.isRequired;

export default AlbumCap;
