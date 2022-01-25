import React from 'react';
import s from './style/InfoWarning.module.css'
import {Alert} from "react-bootstrap";

const InfoWarning = () => {
    return (
        <div className={s.InfoWarningAlert}>
            <Alert variant="success" style={{fontSize: 'small', width: '85%'}}>
                <Alert.Heading style={{textAlign:'center'}}>Это учебный интернет-магазин</Alert.Heading>
                <p>
                    Чтобы протестировать его в роли покупателя зарегистрируйтесь с логином: user1@gmail.com , пароль
                    12345.
                </p>
                <p>
                    Для тестирования в роли администратора зарегистрируйтесь с логином: admin@gmail.com , пароль 12345
                </p>
                <hr/>
                <p className="mb-0">
                    Выберите регистрацию для создания своего пользователя с правами USER или ADMIN!
                </p>
            </Alert>
        </div>
    );
};

export default InfoWarning;