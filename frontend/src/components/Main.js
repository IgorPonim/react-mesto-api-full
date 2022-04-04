import { useContext } from 'react';
import Profile from './Profile';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick,
    cards, onCardLike, onCardDelete }) => {


    const currentUser = useContext(CurrentUserContext)


    return (
        <main>
            <Profile
                name={currentUser.name}
                avatar={currentUser.avatar}
                about={currentUser.about}
                onEditProfile={onEditProfile}
                onAddClick={onAddPlace}
                onAvatarEditClick={onEditAvatar} />
            <section className='elements'>
                {/*поставил _id в key,а то react ругался*/}
                {cards.map((card) => {
                    return (<Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
                })}
            </section>

        </main>
    )
}

export default Main;