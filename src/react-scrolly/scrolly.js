import { debounce } from './util';

class Scrolly {
    currentPureScroll = null;
    lastPureScroll = null;
    currentScroll = null;
    lastScroll = null;
    currentMappedScroll = null;
    lastMappedScroll = null;
    lessThan = (a, b) => a < b;
    rangeFunction = null;
    wrapperHeight = null;
    listeners = {
        inside: new Map(),
        enter: new Map(),
        leave: new Map(),
        before: new Map(),
        after: new Map(),
        exceed: new Map(),
        exceedFromAfter: new Map(),
        scroll: []
    };

    pureListeners = {
        inside: new Map(),
        enter: new Map(),
        leave: new Map(),
        before: new Map(),
        after: new Map(),
        exceed: new Map(),
        exceedFromAfter: new Map(),
        scroll: []
    };

    setRangeFunction(rangeFunction) {
        this.rangeFunction = rangeFunction;
    }

    setCompareFunction(lessThan) {
        this.lessThan = lessThan;
    }

    setWrapperHeight(wrapperHeight) {
        this.wrapperHeight = wrapperHeight;
    }

    getWrapperHeight() {
        return this.wrapperHeight;
    }

    _updateLastPureScroll = lastPureScroll => {
        this.lastPureScroll = lastPureScroll;
    };

    setPureScroll(currentPureScroll) {
        this._updateLastPureScroll(this.currentPureScroll)
        this.currentPureScroll = currentPureScroll;

        if (this.currentPureScroll !== null && this.lastPureScroll !== null) {
            for (let [range, listener] of this.pureListeners.inside) {
                if (
                    range[0] <= this.currentPureScroll &&
                    this.currentPureScroll <= range[1]
                ) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let [range, listener] of this.pureListeners.enter) {
                if (
                    (this.lastPureScroll <= range[0] &&
                        range[0] <= this.currentPureScroll) ||
                    (range[1] <= this.lastPureScroll &&
                        this.currentPureScroll <= range[1])
                ) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let [range, listener] of this.pureListeners.leave) {
                if (
                    (this.lastPureScroll <= range[1] &&
                        range[1] < this.currentPureScroll) ||
                    ((range[0] + this.wrapperHeight) <= this.lastPureScroll &&
                        this.currentPureScroll < (range[0] + this.wrapperHeight))
                ) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let [value, listener] of this.pureListeners.before) {
                if (this.currentPureScroll < value) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let [value, listener] of this.pureListeners.after) {
                if (value <= this.currentPureScroll) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let [value, listener] of this.pureListeners.exceed) {
                if (this.lastPureScroll <= value &&
                    value <= this.currentPureScroll) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let [value, listener] of this.pureListeners.exceedFromAfter) {
                if (
                    value <= this.lastPureScroll &&
                    this.currentPureScroll <= value
                ) {
                    listener && listener(this.currentPureScroll, this.currentMappedScroll);
                }
            }

            for (let listener of this.pureListeners.scroll) {
                listener && listener(this.currentPureScroll, this.currentMappedScroll);
            }
        }
    }

    _updateLastScroll = lastScroll => {
        this.lastScroll = lastScroll;
    };

    setScroll(currentScroll) {
        this._updateLastScroll(this.currentScroll)
        this.currentScroll = currentScroll;
        this.lastMappedScroll = this.currentMappedScroll;
        this.currentMappedScroll = this.rangeFunction(currentScroll);

        if (this.currentScroll !== null && this.lastScroll !== null) {
            for (let [range, listener] of this.listeners.inside) {
                if (
                    this.lessThan(range[0], this.currentMappedScroll) &&
                    this.lessThan(this.currentMappedScroll, range[1])) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let [range, listener] of this.listeners.enter) {
                if (
                    (this.lessThan(this.lastMappedScroll, range[0]) &&
                    this.lessThan(range[0], this.currentMappedScroll)) ||
                    (this.lessThan(range[1], this.lastMappedScroll) &&
                    this.lessThan(this.currentMappedScroll, range[1]))
                ) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let [range, listener] of this.listeners.leave) {
                if (
                    (this.lessThan(this.lastMappedScroll, range[1]) &&
                    this.lessThan(range[1], this.currentMappedScroll)) ||
                    (this.lessThan(range[0], this.lastMappedScroll) &&
                    this.lessThan(this.currentMappedScroll, range[0]))
                ) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let [value, listener] of this.listeners.before) {
                if (this.lessThan(this.currentMappedScroll, value)) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let [value, listener] of this.listeners.after) {
                if (this.lessThan(value, this.currentMappedScroll)) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let [value, listener] of this.listeners.exceed) {
                if (this.lessThan(this.lastMappedScroll, value) && 
                    this.lessThan(value, this.currentMappedScroll)) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let [value, listener] of this.listeners.exceedFromAfter) {
                if (this.lessThan(value, this.lastMappedScroll) && 
                    this.lessThan(this.currentMappedScroll, value)) {
                    listener && listener(this.currentMappedScroll);
                }
            }
    
            for (let listener of this.listeners.scroll) {
                listener && listener(this.currentMappedScroll);
            }
        }
    }

    pure = {
        onInside: (range, callback) => {
            if (range.length < 2) throw new Error('Range must have a start and end values.');

            this.pureListeners.inside.set(range, callback);
            return this;
        },

        onEnter: (range, callback) => {
            if (range.length < 2) throw new Error('Range must have a start and end values.');

            this.pureListeners.enter.set(range, callback);
            return this;
        },

        onLeave: (range, callback) => {
            if (range.length < 2) throw new Error('Range must have a start and end values.');

            this.pureListeners.leave.set(range, callback);
            return this;
        },

        onBefore: (value, callback) => {
            this.pureListeners.before.set(value, callback);
            return this;
        },

        onAfter: (value, callback) => {
            this.pureListeners.after.set(value, callback);
            return this;
        },

        onExceed: (value, callback) => {
            this.pureListeners.exceed.set(value, callback);
            return this;
        },

        onExceedFromAfter: (value, callback) => {
            this.pureListeners.exceedFromAfter.set(value, callback);
            return this;
        },

        onScroll: (callback) => {
            this.pureListeners.scroll.push(callback);
            return this;
        }
    }

    onInside(range, callback) {
        if (range.length < 2) throw new Error('Range must have a start and end values.');

        this.listeners.inside.set(range, callback);
        return this;
    }

    onEnter(range, callback) {
        if (range.length < 2) throw new Error('Range must have a start and end values.');

        this.listeners.enter.set(range, callback);
        return this;
    }

    onLeave(range, callback) {
        if (range.length < 2) throw new Error('Range must have a start and end values.');

        this.listeners.leave.set(range, callback);
        return this;
    }

    onBefore(value, callback) {
        this.listeners.before.set(value, callback);
        return this;
    }

    onAfter(value, callback) {
        this.listeners.after.set(value, callback);
        return this;
    }

    onExceed(value, callback) {
        this.listeners.exceed.set(value, callback);
        return this;
    }

    onExceedFromAfter(value, callback) {
        this.listeners.exceedFromAfter.set(value, callback);
        return this;
    }

    onScroll(callback) {
        this.listeners.scroll.push(callback);
        return this;
    }
}

export default Scrolly;