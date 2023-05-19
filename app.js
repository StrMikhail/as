import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Count from './components/count';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const list = store.getState().list;
    const cart = store.getCart();
    const [isOpen, setOpen] = useState(false);

    const callbacks = {
        onDeleteItem: useCallback(
            (code) => {
                store.deleteItem(code);
            },
            [store],
        ),

        onSelectItem: useCallback(
            (code) => {
                store.selectItem(code);
            },
            [store],
        ),

        addItemToCart: useCallback(
            (item) => {
                store.addItemToCart(item);
            },
            [cart],
        ),
    };

    const getCartItem = useCallback(
        (code) => {
            store.getCartItem(code);
        },
        [store],
    );

    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };

    return (
        <PageLayout>
            <Head title="Приложение на чистом JS" />
            <Controls onAdd={callbacks.onAddItem} onOpenModal={() => openModal()}>
                <Count count={'as'} sum={'as'} />
            </Controls>
            {isOpen && (
                <Modal onCloseModal={closeModal} item={AudioListener} getCartItem={getCartItem} />
            )}
            <List list={list} onAdd={callbacks.addItemToCart} />
        </PageLayout>
    );
}

export default App;
