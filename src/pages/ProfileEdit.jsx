import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    load: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      load: false,
    });
    // console.log(user);
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { load, name, email, description, image } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { load && <Loading /> }
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
            name=""
            id=""
            value={ description }
            data-testid="edit-input-description"
            onChange={ this.handleChange }
          />
          <input
            placeholder="Url da imagem"
            type="text"
            name=""
            id=""
            value={ image }
            data-testid="edit-input-image"
            onChange={ this.handleChange }
          />
          <input type="button" value="Salvar" />
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
