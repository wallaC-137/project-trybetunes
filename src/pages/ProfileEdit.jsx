import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    load: true,
    btnDisabled: true, // mudar para true
  };

  async componentDidMount() {
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
      load: false,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  };

  attUser = async () => {
    const { name, email, image, description } = this.state;
    const { history: { push } } = this.props;
    this.setState({ load: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ load: false });
    push('/profile');
  };

  validation = () => {
    const { name, email, image, description } = this.state;
    const validaEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email); // ok
    const validaName = name.length > 0;
    const validaImage = image.length > 0;
    const validaDescription = description.length > 0;
    const result = !(validaEmail && validaName && validaImage && validaDescription);

    this.setState({
      btnDisabled: result,
    });
  };

  render() {
    const { load, name, email, description, image, btnDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { load && <Loading /> }
        { !load && (
          <form>
            <input
              placeholder="Nome"
              type="text"
              name="name"
              id="name"
              value={ name }
              data-testid="edit-input-name"
              onChange={ this.handleChange }
            />
            <input
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              value={ email }
              data-testid="edit-input-email"
              onChange={ this.handleChange }
            />
            <input
              placeholder="Descrição"
              type="text"
              name="description"
              id=""
              value={ description }
              data-testid="edit-input-description"
              onChange={ this.handleChange }
            />
            <input
              placeholder="Url da imagem"
              type="text"
              name="image"
              id=""
              value={ image }
              data-testid="edit-input-image"
              onChange={ this.handleChange }
            />
            <input
              type="button"
              value="Salvar"
              disabled={ btnDisabled }
              onClick={ this.attUser }
            />
          </form>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
