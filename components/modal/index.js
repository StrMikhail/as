import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Modal({ onCloseModal, getCartItem, item, onDeleteItem }) {
    return (
        <>
            <div className="Modal">
                <div className="Modal-head">
                    <h1>{'Корзина'}</h1>
                    <button onClick={onCloseModal}>Закрыть</button>
                </div>
                <div className="Modal-body">
                    {item &&
                        item.map((i, index) => (
                            <div className="Modal-item">
                                <span>
                                    {index + 1}. {i.title}
                                </span>
                                <span>{i.price}</span>
                                <span>{i.code}</span>

                                {/* Другие свойства товара */}
                                <button onClick={() => onDeleteItem(i.code)}>Удалить</button>
                            </div>
                        ))}
                </div>
                <div className="Modal-footer">Итого: 100 руб</div>
            </div>
        </>
    );
}
Modal.propTypes = {
    onCloseModal: PropTypes.func,
    onDelete: PropTypes.func,
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selected: PropTypes.bool,
        count: PropTypes.number,
    }).isRequired,
};

export default React.memo(Modal);
