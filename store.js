import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.cartItem = [];
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
        console.log(code);
        let x = this.findItem(code);
        // let x = this.state.list.filter((item) => item.code === code);
        return x;
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
        const code = item.code;
        const item = this.state.list.map((item) => {
          if (item.code === code) {
              // Смена выделения и подсчёт
              return {
                  ...item,
                  selected: !item.selected,
                  count: item.selected ? item.count : item.count + 1 || 1,
              };
          }
          console.log(item)
        // this.setCart([
        //     this.state.list.map((item) => {
        //         if (item.code === code) {
        //             // Смена выделения и подсчёт
        //             return {
        //                 ...item,
        //                 selected: !item.selected,
        //                 count: item.selected ? item.count : item.count + 1 || 1,
        //             };
        //         }
        //         // Сброс выделения если выделена
        //         // return item.selected ? { ...item, selected: false } : item;
        //     }),
        // ]
        // )
        }
        ;

        this.setCart({
            total: this.cartItem.total + item.price,
            list: [...this.cartItem.list, item.code],
        });
        // this.setCart([{total: total + item.price}, {[...this.cartItem, item.code]}]);
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            // Новый список, в котором не будет удаляемой записи
            list: this.state.list.filter((item) => item.code !== code),
        });
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
                // return item.selected ? { ...item, selected: false } : item;
            }),
        });
    }
}

export default Store;
