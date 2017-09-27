"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["UNINITIALIZED"] = -1] = "UNINITIALIZED";
    State[State["CONNECTING"] = 0] = "CONNECTING";
    State[State["OPEN"] = 1] = "OPEN";
    State[State["CLOSING"] = 2] = "CLOSING";
    State[State["CLOSED"] = 3] = "CLOSED";
})(State = exports.State || (exports.State = {}));
//# sourceMappingURL=state.js.map