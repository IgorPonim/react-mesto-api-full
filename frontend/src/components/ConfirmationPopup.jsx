

const ConfirmationPopup = ({ onClose, handleCardDelete, card, isLoading }) => {

    function handleSubmit(ev) {
        handleCardDelete(card)
        ev.preventDefault()
    }

    return (
        <div className={`popup  ${card ? 'popup_open' : ''}`}>
            <div className='popup__content'>
                <button type='button' onClick={onClose} className={`popup__close`}></button>
                <h3 className='popup__title'>Вы уверены?</h3>
                <form onSubmit={handleSubmit} name={`confirm`} className='popup__form'>

                    <button type='submit' className='popup__button popup__button_type_confirm'>{`${isLoading ? 'Удаление...' : 'Да'}`}</button>
                </form>
            </div>

        </div>

    )
}

export default ConfirmationPopup 
