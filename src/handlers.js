import { rest } from 'msw';

import OpenAPIBackend from 'openapi-backend';
import definition from './spec';

const api = new OpenAPIBackend({
    definition,
    handlers: {
        PostPaymentIntents: async (req, res, ctx) => {
            const {status, mock} = await api.mockResponseForOperation(req.operation.operationId);
            return res(ctx.status(status), ctx.json(mock));
        }
    }
})

api.init();

const handlers = [
    rest.post("https://api.stripe.com/v1/payment_intents", async (req, res, ctx) => {
        req.path = req.url.pathname;
        return api.handleRequest(req, res, ctx);
    }),
]

export default handlers;