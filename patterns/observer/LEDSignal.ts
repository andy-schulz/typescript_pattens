import {IFObserver} from "./IFObserver";
import {IFSubject} from "./IFSubject";
import {getLogger} from "log4js";

export class LED implements IFObserver{
    private logger = getLogger("LED");

    constructor(subject: IFSubject) {
        this.logger.info("LED Object initialized");
        subject.register(this);
    }

    update(motion: boolean) {
        this.logger.info(`Switch LED ${motion ? "on" : "off"}`)
        // Switch the LED ON or OFF
    }
}