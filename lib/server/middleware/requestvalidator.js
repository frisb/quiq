"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyValidator = exports.HeaderValidator = void 0;
const routing_controllers_1 = require("routing-controllers");
const writeln_1 = require("writeln");
const logger = new writeln_1.Logger('Request Validator');
class RequestValidatorError extends routing_controllers_1.HttpError {
    constructor() {
        super(400, 'Bad Request');
    }
}
function validate(type, method, collection, fieldNames) {
    for (let i = 0, { length } = fieldNames; i < length; i++) {
        let name = fieldNames[i];
        if (typeof collection[name] === 'undefined') {
            logger.error(`Header param "${name}" not found in ${type} for ${method.toUpperCase()} request`, collection);
            throw new RequestValidatorError();
        }
    }
}
function HeaderValidator(...fieldNames) {
    class HeaderValidator {
        use(req, res, next) {
            let { headers, method } = req;
            validate('header', method, headers, fieldNames.map((header) => header.toLowerCase()));
            next();
        }
    }
    return HeaderValidator;
}
exports.HeaderValidator = HeaderValidator;
function BodyValidator(...fieldNames) {
    class BodyValidator {
        use(req, res, next) {
            let { body, method } = req;
            if (!body) {
                logger.error(`Body not found for ${method.toUpperCase()} request`);
                throw new RequestValidatorError();
            }
            else {
                validate('body', method, body, fieldNames);
            }
            next();
        }
    }
    return BodyValidator;
}
exports.BodyValidator = BodyValidator;
//# sourceMappingURL=requestvalidator.js.map