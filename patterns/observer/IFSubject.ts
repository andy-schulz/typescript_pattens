import {IFObserver} from "./IFObserver";

export interface IFSubject {
    register(observer: IFObserver);
    remove(observer: IFObserver);
    notify();
}