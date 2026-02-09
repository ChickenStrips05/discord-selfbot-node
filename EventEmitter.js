class EventEmitter {
    constructor() {
        this.events = {}

        this.on = this.on.bind(this)
        this.emit = this.emit.bind(this)
        this.off = this.off.bind(this)
        this.once = this.once.bind(this)
        this.addListener = this.addListener.bind(this)
        this.removeAllListeners = this.removeAllListeners.bind(this)
    }

    on(event, listener) {
        if (!this?.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(listener)
    }

    addListener(event, listener) {
        this.on(event, listener)
    }

    emit(event, ...args) {
        if (!this.events[event]) return
        this.events[event].forEach(listener => listener(...args))
    }

    off(event, listener) {
        if (!this.events[event]) return
        this.events[event] = this.events[event].filter(l => l !== listener)
    }

    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper)
            listener(...args)
        }
        this.on(event, wrapper)
    }

    removeAllListeners(event) {
        if (event) {
            delete this.events[event]
        } else {
            this.events = {}
        }
    }
}

module.exports = EventEmitter