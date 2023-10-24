import React, { useState, useEffect } from 'react';
import api from './api';
import { FiSearch } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import './styles.css';

function App() {
  const [userName, setUserName] = useState('');
  const [login, setLogin] = useState({});
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isAlphabeticalOrder, setIsAlphabeticalOrder] = useState(false);

  useEffect(() => {}, []);

  async function handleSearch() {
    if (userName === '') {
      alert('Digite o nome de algum usuário');
      return;
    }

    try {
      const response = await api.get(`https://api.github.com/users/${userName}`);
      setLogin(response.data);
      setUserName('');
    } catch (error) {
      alert('Erro ao buscar usuário');
      setUserName('');
    }

    setSelectedUser(null);
  }

  async function adicionarUsuarioFavorito(user) {
    if (favoriteUsers.length >= 5) {
      alert('Número máximo de usuários favoritos já cadastrado');
      return;
    }

    try {
      const response = await api.post('http://localhost:3000/users', { username: user.login });
      console.log('Usuário adicionado aos favoritos:', response.data);

      setSuccessMessage('Usuário adicionado com sucesso');

      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

      visualizarlista();
    } catch (error) {
      console.error('Erro ao adicionar usuário aos favoritos:', error);
    }
  }

  async function visualizarlista() {
    try {
      const response = await api.get('http://localhost:3000/users');
      const favoriteUsersWithNames = await Promise.all(
        response.data.map(async (user) => {
          const userDetails = await api.get(`https://api.github.com/users/${user.username}`);
          return {
            username: user.username,
            avatar_url: userDetails.data.avatar_url,
            url: userDetails.data.html_url,
            name: userDetails.data.name,
            starred: user.starred,
          };
        })
      );

      setFavoriteUsers(favoriteUsersWithNames);
    } catch (error) {
      console.error('Erro ao buscar lista de usuários favoritos:', error);
    }
  }

  async function excluirUsuario(username) {
    try {
      await api.delete(`http://localhost:3000/users/${username}`);
      visualizarlista(); // Atualize a lista após excluir um usuário
    } catch (error) {
      console.error('Erro ao excluir usuário dos favoritos:', error);
    }
  }

  async function toggleStar(username) {
    try {
      const updatedUsers = favoriteUsers.map((user) => {
        if (user.username === username) {
          user.starred = !user.starred;
        } else {
          user.starred = false;
        }
        return user;
      });

      setFavoriteUsers(updatedUsers);

      const response = await api.patch(`http://localhost:3000/users/${username}/toggle-star`);
    } catch (error) {
      console.error('Erro ao alternar estrela do usuário:', error);
    }
  }

  const toggleAlphabeticalOrder = () => {
    setIsAlphabeticalOrder(!isAlphabeticalOrder);
  };

  const sortFavoriteUsers = (users) => {
    return users.slice().sort((a, b) => {
      const nameA = a.name || 'zzzzzzz';
      const nameB = b.name || 'zzzzzzz';

      if (isAlphabeticalOrder) {
        return nameA.localeCompare(nameB);
      } else {
        return 0; // Mantém a ordem original
      }
    });
  };

  return (
    <div className="container">
      <div className="title-container">
        <FaGithub size={50} color="#FFF" />
        <h1 className="title">Usuários favoritos</h1>
        <FaGithub size={50} color="#FFF" />
      </div>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o usuário github"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(login).length > 0 && (
        <main className="main">
          <div className="user-info">
            <img src={login.avatar_url} alt={login.login} style={{ maxWidth: '200px', marginTop: '20px', borderRadius: '50%' }} />
            <div className="user-details">
              <span className="user-name">Nome: {login.name}</span>
              <span className="user-github">Github: {login.login}</span>
              <a className="user-url" href={login.html_url} target="_blank" rel="noopener noreferrer">
                Ver perfil
              </a>
            </div>
          </div>
          <button className="buttonAdicionar" onClick={() => adicionarUsuarioFavorito(login)}>
            Adicionar usuário na lista de favoritos
          </button>
          {successMessage && <div className="success-message">{successMessage}</div>}

          {favoriteUsers.length > 0 && (
            <button className="buttonListagem" onClick={() => setIsTableVisible(!isTableVisible)}>
              {isTableVisible ? 'Ocultar lista' : 'Visualizar lista de usuários favoritos'}
            </button>
          )}
        </main>
      )}

      {isTableVisible && favoriteUsers.length > 0 && (
        <div className="grid-container">
          <div className="favorites-title-container">
            <FaGithub size={50} color="#FFF" />
            <h1 className="title2">Os favoritos</h1>
            <FaGithub size={50} color="#FFF" />
          </div>

          <div className="grid-items-container">
            {sortFavoriteUsers(favoriteUsers).map((user) => (
              <div className="grid-item" key={user.username}>
                <div className="grid-item-content">
                  <div className="grid-item-image">
                    <img src={user.avatar_url} alt={user.login} style={{ maxWidth: '100px' }} />
                    <span
                      className={`star-button ${user.starred ? 'starred' : ''}`}
                      onClick={() => toggleStar(user.username)}
                    >
                      {user.starred ? <span className="star">&#9733;</span> : <span>&#9734;</span>}
                    </span>
                    <button className="excluir-button" onClick={() => excluirUsuario(user.username)}>
                      <BsTrash className="trash-icon" />
                    </button>
                  </div>
                </div>
                <div className="user-details">
                  <h3>{user.name} {user.username}</h3>
                  <a href={user.url} target="_blank" rel="noopener noreferrer">
                    Ver perfil
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="buttonOrdContainer">
            <button className="buttonOrd" onClick={toggleAlphabeticalOrder}>
              Ordenar em ordem alfabética
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
