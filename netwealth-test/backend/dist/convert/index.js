"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('HTTP trigger function processed a request.');
        const from = req.query.from;
        const to = req.query.to;
        const amount = parseFloat(req.query.amount);
        try {
            const result = yield getLatest();
            const convertedAmount = (result.rates[to] / result.rates[from]) * amount;
            context.res = {
                headers: { 'Content-Type': 'application/json' },
                // status: 200, /* Defaults to 200 */
                body: {
                    convertedAmount: convertedAmount
                }
            };
        }
        catch (err) {
            context.res = {
                status: 401,
                body: err.message
            };
        }
    });
};
const getLatest = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        access_key: "b9e2437fbf3abe8d8b08e9daaec44fae",
        base: 'EUR'
    };
    const apiEndpoint = "http://data.fixer.io/api/latest";
    const url = [
        apiEndpoint,
        Object.keys(params)
            .map(param => `${param}=${params[param]}`)
            .join("&")
    ].join("?");
    let response = yield axios_1.default.get(url);
    if (response.data.success) {
        return response.data;
    }
    else {
        throw new Error('Unsuccessful PAI call');
    }
});
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map