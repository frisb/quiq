"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const writeln_1 = require("writeln");
const logger = new writeln_1.Writeln('Payload Validator');
class PayloadError extends routing_controllers_1.HttpError {
    constructor() {
        super(400, 'Bad Request');
    }
}
function PayloadValidator(...fieldNames) {
    class PayloadValidator {
        use(req, res, next) {
            let { body, method } = req;
            let isValid = true;
            if (!body) {
                logger.error(`Body not found for ${method.toUpperCase()} request`);
                isValid = false;
            }
            else {
                for (let i = 0, { length } = fieldNames; i < length; i++) {
                    let name = fieldNames[i];
                    if (!body[name]) {
                        logger.error(`Body param "${name}" not found in payload for ${method.toUpperCase()} request`, body);
                        isValid = false;
                        break;
                    }
                }
            }
            if (!isValid)
                throw new PayloadError();
            next();
        }
    }
    return PayloadValidator;
}
exports.PayloadValidator = PayloadValidator;
//# sourceMappingURL=payloadvalidator.js.map