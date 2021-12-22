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
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Xiaomi'},
            {id: 4, name: 'LG'},
            {id: 5, name: 'Pioneer'}

        ]
        this._devices = [
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
            },{
                id: 5,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },{
                id: 6,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },{
                id: 7,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },{
                id: 8,
                name: 'Веб-камера A4Tech PK-930HA USB Black',
                rating: 5,
                img: 'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'
            },
        ]
        this._selectedType = {}
        this._selectedBrand = {}
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
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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
    get selectedBrand() {
        return this._selectedBrand
    }


}