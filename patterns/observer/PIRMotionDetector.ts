import {getLogger} from "log4js";
import {IFSubject} from "./IFSubject";
import {IFObserver} from "./IFObserver";

const logger = getLogger("PIRMotionDetector");




export class PIRMotionDetector implements IFSubject {
    private observers: Set<IFObserver> = new Set();
    private currentMotion: boolean = false;



    setMotion(motion: boolean) {
        logger.info("Motion detected");
        this.currentMotion = motion;

        this.notify();

    }

    notify() {
        for (let observer of this.observers) {
            observer.update(this.currentMotion);
        }
    }

    register(observer: IFObserver) {
        this.observers.add(observer);
    }

    remove(observer: IFObserver) {
        this.observers.delete(observer)
    }
}