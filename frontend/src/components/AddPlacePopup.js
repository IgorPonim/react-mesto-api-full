import PopupWithForm from "./PopupWithForm"
import { useState } from "react"
import { useEffect } from "react"

const AddPlacePopup = ({ isOpen, onClose, addElement, buttonText, isloading }) => {

    //все по образцу editprofile/editAvatar
    const [name, setName] = useState('')
    const [link, setLink] = useState('')


   

    function onChange(ev) {
        if (ev.target.name === 'name') { setName(ev.target.value) }
        else if (ev.target.name === 'link') { setLink(ev.target.value) }
    }


    function onSubmit(ev) {
        ev.preventDefault()
        addElement({ name, link })
    }

    useEffect(() => {//класс, очищаю поля при открытии
        setName('');
        setLink('');
    }, [isOpen]);


    return (
        <PopupWithForm isloading={isloading} buttonText={buttonText} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} title='Новое место' name='place-info'>
            <input value = {name} onChange={onChange} id='input-element-name' name='name' minLength='2' maxLength='40' required type='text'
                placeholder='Название' className='popup__input popup__input_type_name-element' />
            <span id='input-element-name-error' className='popup__error popup-element-error'></span>
            <input value = {link} onChange={onChange} id='input-element-link' name='link' type='url' required placeholder='Ссылка на картинку'
                className='popup__input popup__input_type_link' />
            <span id='input-element-link-error' className='popup__error popup-link-error'></span>
        </PopupWithForm>)
}



export default AddPlacePopup