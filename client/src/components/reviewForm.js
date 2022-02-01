import React from 'react';
import {Button, Form} from "react-bootstrap";

const ReviewForm = ({setReview,sendReview,setRate}) => {


    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Select aria-label="Default select example"
                             onChange={event => {
                                 setRate(event.target.value)
                             }}
                >
                    <option>Выберите оценку товару</option>
                    <option value="1">Ужасно</option>
                    <option value="2">Плохо</option>
                    <option value="3">Средне</option>
                    <option value="4">Хорошо</option>
                    <option value="5">Отлично</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Комментарий:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e =>
                    setReview(e.target.value)
                }/>
            </Form.Group>
            <Button variant="outline-success" onClick={sendReview}>Оставить отзыв</Button>
        </Form>
    );
};

export default ReviewForm;