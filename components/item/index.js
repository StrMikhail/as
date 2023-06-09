import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {
    const callbacks = {
        // onClick: () => {
        //   props.onSelect(props.item.code);
        //   if (!props.item.selected) {
        //     setCount(count + 1);
        //   }
        // },

        onDelete: (e) => {
            e.stopPropagation();
            props.onDelete(props.item.code);
        },
        onAdd: () => {
            // console.log('ok');
            props.onAdd(props.item);
        },
    };

    return (
        <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
            <div className="Item-code">{props.item.code}</div>
            <div className="Item-title">
                <p>{props.item.title}</p>
                <p>{props.item.price} ₽</p>
            </div>
            <div className="Item-actions">
                <button onClick={callbacks.onAdd}>Добавить</button>
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selected: PropTypes.bool,
        count: PropTypes.number,
    }).isRequired,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func,
};

Item.defaultProps = {
    onDelete: () => {},
    onSelect: () => {},
};

export default React.memo(Item);
