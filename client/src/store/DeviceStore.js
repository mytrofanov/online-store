import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Смартфоны'},
            {id: 3, name: 'Телевизоры'},
            {id: 4, name: 'Ноутбуки'},
        ]
        this._brands = [{id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'}]
        this._device = [
            {
                id: 1,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },
            {
                id: 2,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },
            {
                id: 3,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },
            {
                id: 4,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            }
        ]
        this._selectedType = {}
        makeAutoObservable(this)
    }


    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    get Types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }


}