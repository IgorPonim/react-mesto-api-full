
import { useEffect } from "react";
import NO from '../images/NO.png'
import YES from '../images/YES.png'



const InfoToolTip = ({ isOpen, onClose, status }) => {





    return (
        <div className={`popup  ${isOpen ? 'popup_open' : ''}`}>
            <div className='popup__content'  >
                <button type='button' onClick={onClose} className='popup__close'></button>
                {status === 'result' && (
                    <>
                        <img className='InfoToolTip__img' alt="Все получилось" src={YES} />
                    </>

                )}
                {status === 'error' && (
                    <>
                        <img className='InfoToolTip__img' alt="Неполучилось" src={NO} />
                    </>

                )}

            </div>
        </div>
    )

}




export default InfoToolTip