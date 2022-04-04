import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



const EditProfilePopup = ({ isOpen, onClose, sendInfo, buttonText, isloading }) => {

    const currentUser = useContext(CurrentUserContext)

    const [name, setName] = useState('')
    const [job, setJob] = useState('')


    //собираю данные инпутов
    function onChange(ev) {
        if (ev.target.name === 'name') { setName(ev.target.value) }
        else if (ev.target.name === 'job') { setJob(ev.target.value) }
    }


    useEffect(() => {
        setName(currentUser.name);
        setJob(currentUser.about);
    }, [currentUser, isOpen]); //точняк, надо на открытие подписаться, иначе поля не заполняюся, пропустил

    //отправляю данные и закрыаю попап
    function onSubmit(ev) {
        ev.preventDefault()
        sendInfo({ name, job })
        // onClose()
    }



    return (
        <PopupWithForm isloading={isloading} buttonText={buttonText} onSubmit={onSubmit} isOpen={isOpen} onClose={onClose} title='Редактировать профиль' name='profile'>
            <input onChange={onChange}

                value={name || ''} //вот здесь долго я репу чесал, просто сервер еще не прислал значения поэтому ошибка была

                id='input-name' name='name' minLength='2' maxLength='40' required type='text' placeholder='Имя'
                className='popup__input popup__input_type_name' />
            <span id='input-name-error' className='popup__error popup-username-error'></span>
            <input onChange={onChange} value={job || ''} id='input-job' name='job' minLength='2' maxLength='200' required type='text' placeholder='Род занятий'
                className='popup__input popup__input_type_job' />
            <span id='input-job-error' className='popup__error popup-job-error '></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup