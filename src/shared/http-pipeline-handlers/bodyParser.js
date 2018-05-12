import q from 'q';
import {isNull, isNumber, isString, isBoolean} from 'underscore';

export default (context, next, finish) => {
  let body = context.req.body;
  context.unParsedBody = body;
  Object.keys(body).forEach((key) => {
    let value = body[key];
    if (isNull(value)) {
      body[key] = null;
    }
    else if (isNumber(value)) {
      body[key] = Number(value);
    }
    else if (isBoolean(value)) {
      body[key] = Boolean(value);
    }
    else if (isString(value)) {
      body[key] = String(value);
    }
  });
  context.req.body = body;
  next();
}