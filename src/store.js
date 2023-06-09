import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.cartItem = { total: 0, list: [] };
    }

    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter((item) => item !== listener);
        };
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }
    getCart() {
        return this.cartItem;
    }
    getCartItem(code) {
        let filteredItem = this.findItem(code);
        return filteredItem;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }
    setCart(newCartItem) {
        this.cartItem = newCartItem;

        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    /**
     * Добавление новой записи
     */
    addItem() {
        this.setState({
            ...this.state,
            list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
        });
    }

    addItemToCart(item) {
        const foundItem = this.cartItem.list.find((cartItem) => cartItem.code === item.code);

        if (foundItem) {
            const updatedList = this.cartItem.list.map((cartItem) => {
                if (cartItem.code === item.code) {
                    const updatedCount = cartItem.count ? cartItem.count + 1 : 1;
                    return {
                        ...cartItem,
                        count: updatedCount,
                        price: item.price,
                    };
                }
                return cartItem;
            });

            const updatedTotal = updatedList.reduce(
                (total, cartItem) => total + cartItem.price * (cartItem.count || 0),
                0,
            );

            const newCartItem = {
                total: updatedTotal,
                list: updatedList,
            };

            this.setCart(newCartItem);
        } else {
            const newCartItem = {
                total: this.cartItem.total + item.price,
                list: [...this.cartItem.list, { ...item, count: 1 }],
            };

            this.setCart(newCartItem);
        }
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        const good = this.cartItem.list.find((item) => item.code === code);
        let goodList = this.cartItem.list;

        if (good?.count > 1) {
            good.count = good.count - 1;
            this.setCart({
                total: this.cartItem.total - good.price,
                list: [...goodList],
            });
        } else {
            this.setCart({
                total: this.cartItem.total,
                list: [...goodList.filter((item) => item.code !== code)],
            });
        }
    }
    findItem(code) {
        return this.state.list.filter((item) => item.code === code);
    }

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map((item) => {
                if (item.code === code) {
                    // Смена выделения и подсчёт
                    return {
                        ...item,
                        selected: !item.selected,
                        count: item.selected ? item.count : item.count + 1 || 1,
                    };
                }
                // Сброс выделения если выделена
                return item.selected ? { ...item, selected: false } : item;
            }),
        });
    }
}

export default Store;
