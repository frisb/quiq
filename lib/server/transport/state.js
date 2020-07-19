"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State;
(function (State) {
    State[State["UNINITIALIZED"] = -1] = "UNINITIALIZED";
    State[State["CONNECTING"] = 0] = "CONNECTING";
    State[State["OPEN"] = 1] = "OPEN";
    State[State["CLOSING"] = 2] = "CLOSING";
    State[State["CLOSED"] = 3] = "CLOSED";
})(State = exports.State || (exports.State = {}));
//# sourceMappingURL=state.js.map