import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { useContext } from "react";




const Card = ({ card, onCardClick , onCardLike, onCardDelete}) => {

    const currentUser = useContext(CurrentUserContext) //вытаскиваю данные из контекста
    // console.log(useContext(CurrentUserContext) )
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
    );


    const isLiked = card.likes.some(i => i.toString() === currentUser._id);
    const cardLikeButtonClassName = `element__reaction ${isLiked ? 'element__reaction_like' : ''}`;
 

    function addLikeClick() {
        onCardLike(card)
    }

    function deleteCards(){
        onCardDelete(card)
    }



    return (
        <article className='element'>
            <img onClick={() => { onCardClick(card) }} className='element__image' alt={card.name} src={card.link} />
            <button type='submit' onClick={deleteCards} className={cardDeleteButtonClassName}></button>
            <div className='element__description'>
                <h2 className='element__name'>{card.name}</h2>
                <div className='element__likes-area'>
                    <button onClick={addLikeClick} type='button' className={cardLikeButtonClassName}></button>
                    <p className='element__reaction-amount'>{card.likes.length}</p>
                </div>
            </div>
        </article>)
}

export default Card;