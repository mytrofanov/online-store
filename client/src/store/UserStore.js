import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._triedToLogin = false  //needed not to make check request of user status
        this._user = {}
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setTriedToLogin(bool) {
        this._triedToLogin = bool
    }
    setUser(user) {
        this._user = user
    }
    get isAuth(){
        return this._isAuth
    }
    get isAdmin(){
        return this._isAdmin
    }
    get triedToLogin(){
        return this._triedToLogin
    }
    get User(){
        return this._user
    }


}