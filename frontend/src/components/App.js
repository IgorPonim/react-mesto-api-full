import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute.js'
import Login from './Login'
import Register from './Register';
import * as auth from '../utils/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);

  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false)
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const [toolType, setToolType] = useState('result')
  const [email, setEmail] = useState('');
  //для смены подписи кнопки, спасибо за подсказку))
  const [isLoading, setIsLoading] = useState(false);


  //если мы уже вошли ранее он зайдет сам
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')

      auth.checkToken(jwt)

        .then((res) => {
          if (res) {
            // console.log(res)
            history.push('/')
            setLoggedIn(true);
            setEmail(res.data.email);


          } else {
            setLoggedIn(false);
            setEmail('');
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [loggedIn, history]) //не могу с вами согласиться, не понимаю как убрать отсюда loggedin ведь тогда он не отследит статус пользователя



  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null)
    setIsPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(null)
    setIsToolTipOpen(false)
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true)
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true)
  }
  function onAddPlace() {
    setIsPlacePopupOpen(true)
  }
  function onCardClick(card) {
    setSelectedCard(card)
  }



  //отправка запроса с новыми данными пользователя
  function editUserInfo(newInfo) {
    setNewData(true)
    api.editUserInfo(newInfo)
      .then((data) => {
        setTimeout(() => {
          setCurrentUser(data)
          closeAllPopups()
          setNewData(false)
        }, 555);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //отправка запроса с новой аватаркой
  function handleUpdateAvatar(newLink) {
    setNewData(true)
    api.changeAvatar(newLink)
      .then((data) => {
        setTimeout(() => {
          setCurrentUser(data)
          closeAllPopups()
          setNewData(false)
        }, 555);

      })
      .catch((err) => {
        console.log(err)
      })
  }




  //согласен, обьединил загрузку пользователя и карточек и повесил слушатель на loggedin
  useEffect(() => {
    if (loggedIn) {

      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([user, cards]) => {

          setCurrentUser(user)
          // cards.sort(() => 0.5 - Math.random()) //надоели одни и те же карточки
          setCards(cards)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);




  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }



  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteСards(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id)); //наконец то fiter пригодился, я уж думал где его используют..
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)

      })
  }


  function handleAddPlaceSubmit(card) {
    setNewData(true)
    api.createCard(card)
      .then((newCard) => {
        setTimeout(() => {
          setCards([newCard, ...cards])   //обновите стейт cards с помощью расширенной копии текущего массива — используйте оператор ...cards
          closeAllPopups()
          setNewData(false)
        }, 555);
      })
      .catch((error) => {
        console.log(error)
      })
  }


  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        setIsLoadingspinner(true)
        
          setTimeout(() => {
            setLoggedIn(true)
            history.push('/')
            setEmail(email)
            setIsLoadingspinner(false)
          }, 3000)
        
      })
      .catch((err) => {
        console.log(err)
        showToolTipError()
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        showToolTipRegister()
        history.push('/sign-in')
      })
      .catch((err) => {
        showToolTipError()
        console.log(err)
      })
  }

  function showToolTipError() {
    setIsToolTipOpen(true)
    setToolType('error')
  }
  function showToolTipRegister() {
    setIsToolTipOpen(true)
    setToolType('result')
    setTimeout(() => { //впринципе я могу так сделать, если следовать вашей подсказке
      setIsToolTipOpen(false)
    }, 2000);
  }


  //забираю токен из памяти
  function onLoggout() {
    auth.logout()
    .then(() => {
      setLoggedIn(false);
    })
    .catch((err) => {
      showToolTipError()
      console.log(err);
    })
  }

  // //чтобы сообщение само закрывалось, так модно, молодежно
  // useEffect(() => {
  //   setTimeout(() => {
  //     closeToolTipe()
  //   }, 2500);

  // }, [isToolTipOpen])

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(null)
  function onConfirmClick(data) {
    setIsConfirmPopupOpen(data)
  }


  const [isloadingspinner, setIsLoadingspinner] = useState(false)
  const [newData, setNewData] = useState(false)

 
  return (

    <div className='page'>
      {/* обернул контекстом всю страницу */}
      <CurrentUserContext.Provider value={currentUser} >
        <Header onLoggout={onLoggout} email={email} />
        <Switch>
          <Route exact path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route exact path='/sign-in'>
            <Login loggedIn={handleLogin} isloading={isloadingspinner} />
          </Route>

          <ProtectedRoute loggedIn={loggedIn} path='/'>
            <Main
              onEditProfile={onEditProfile}
              onAddPlace={onAddPlace}
              onEditAvatar={onEditAvatar}
              onCardClick={onCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={onConfirmClick}
            />
          </ProtectedRoute>
        </Switch>

        <Footer />

        <EditProfilePopup isloading={newData} buttonText={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} sendInfo={editUserInfo} />

        <AddPlacePopup isloading={newData} buttonText={'Создать'} isOpen={isPlacePopupOpen} onClose={closeAllPopups} addElement={handleAddPlaceSubmit} />

        <EditAvatarPopup isloading={newData} buttonText={'Изменить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} sendInfoAvatar={handleUpdateAvatar} />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <ConfirmationPopup isLoading={isLoading} card={isConfirmPopupOpen} handleCardDelete={handleCardDelete} onClose={closeAllPopups} />

        <InfoToolTip status={toolType} isOpen={isToolTipOpen} onClose={closeAllPopups} />

      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;