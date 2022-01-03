import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <Pagination className={'mt-5'}>
            {pages.map(page =>
                <Pagination.Item key={page}>{page}</Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;