import { useEffect } from "react";
const ImagePopup = ({ card, onClose }) => {
    //просто забыл
    useEffect(() => {
        if (!card) return;
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)//красиво

    }, [card, onClose])

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();

        }
    }

    //деструктуризация это очень классная штука!
    const { name, link } = card || <></> //мне так больше нравится

    return (
        <div onClick={handleOverlay} className={`popup popup_type_${name} ${card ? 'popup_open' : ''}`}>
            <div className='image-container'><img className='image-container__img'
                src={link} alt={name} />
                <button type='button' onClick={onClose} className={`popup__close popup__close_type_${name}`}></button>
                <p className='image-container__info'>{name}</p>
            </div>
        </div>
    )

}

export default ImagePopup