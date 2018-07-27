import "jasmine"
import {PIRMotionDetector} from "../PIRMotionDetector";
import {LED} from "../LEDSignal";
import { configure } from 'log4js';
configure('config/log4js.json');

describe('Observer Pattern ', () => {
    beforeAll(() => {
        this.subject = new PIRMotionDetector();
        this.led = new LED(this.subject);
        this.spy = spyOn(this.led, "update");
    });

    afterEach(() => {
        this.spy.calls.reset();
    });

    describe('should call the update method', () => {

        it('at least once', () => {
            this.subject.setMotion(true);
            expect(this.spy).toHaveBeenCalled();
        });

        it('three times and the second call should be with argument false', () => {
            this.subject.setMotion(true);
            this.subject.setMotion(false);
            this.subject.setMotion(true);

            expect(this.spy).toHaveBeenCalled();

            // @ts-ignore
            expect(this.spy.calls.count()).toBe(3);
            expect(this.spy.calls.first());
            expect(this.spy.calls.argsFor(1)[0]).toBe(<any> false)

        });
    });

    describe('should call the update method on multiple objects', () => {

        it('when more then one object is registered as observer', () => {
            const led2 = new LED(this.subject);
            const led3 = new LED(this.subject);

            const spy2 = spyOn(led2,"update");
            const spy3 = spyOn(led3,"update");

            this.subject.setMotion(true);

            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();

            expect(spy2.calls.count()).toBe(1);
            expect(spy3.calls.count()).toBe(1);

        });
    });

    describe('should not call the update method', () => {
        it('when the the observer is removed', () => {
            this.subject.remove(this.led);

            this.subject.setMotion(true);
            expect(this.spy).not.toHaveBeenCalled();
        });
    });
});