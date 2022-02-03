import React from 'react';
import {Form} from "react-bootstrap";
import s from './style/SortBy.module.css'

const SortBy = ({setSortOrder}) => {


    return (
        <div className={s.sortBy}>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Select aria-label="Default select example" size={"sm"}
                                 onChange={event => {
                                     setSortOrder(event.target.value)
                                 }}
                    >
                        <option>Сортировать по:</option>
                        <option value="expensive">Цене, сначала дорогие</option>
                        <option value="cheap">Цене, сначала не дорогие</option>
                        <option value="reviews">Отзывам</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </div>
    );
};

export default SortBy;