import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    // user: {},
    name: '',
    email: '',
    description: '',
    image: '',
    load: true,
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

  render() {
    const { load, name, email, description, image } = this.state;
    // console.log(name, email, description, image);

    return (
      <div data-testid="page-profile">
        <Header />
        { load && <Loading /> }
        <div>
          <img src={ image } alt={ name } data-testid="profile-image" />
          <button type="button"><Link to="/profile/edit">Editar perfil</Link></button>
        </div>
        <h3>{ name }</h3>
        <p>{ email }</p>
        <p>{ description }</p>
      </div>
    );
  }
}

export default Profile;
