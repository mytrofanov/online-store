import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Смартфоны'}
        ]
        this._brands = [{id:1, name:'Samsung'},
            {id:2, name:'Apple'}]
        this._device = [
            {id:1, name:'Веб-камера A4Tech PK-930HA USB Black', rating:5, img:'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'},
            {id:2, name:'Веб-камера A4Tech PK-930HA USB Black', rating:5, img:'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'},
            {id:3, name:'Веб-камера A4Tech PK-930HA USB Black', rating:5, img:'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'},
            {id:4, name:'Веб-камера A4Tech PK-930HA USB Black', rating:5, img:'https://content1.rozetka.com.ua/goods/images/big/218996956.jpg'}]
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

    get Types() {
        return this._types
    }

    get brands () {
        return this._brands
    }
    get devices () {
        return this._devices
    }


}