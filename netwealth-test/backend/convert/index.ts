import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from 'axios';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const from = req.query.from;
    const to = req.query.to;
    const amount = parseFloat(req.query.amount);

    try {
        const result = await getLatest();
        const convertedAmount = ( result.rates[to] / result.rates[from] ) * amount;

        context.res = {
            headers: { 'Content-Type': 'application/json' },
            // status: 200, /* Defaults to 200 */
            body: {
                convertedAmount: convertedAmount
            }
        };
    } catch (err) {
        context.res = {
            status: 401,
            body: err.message
        };
    }
};

const getLatest = async () => {
    const params = {
        access_key: "b9e2437fbf3abe8d8b08e9daaec44fae",
        base: 'EUR'
    }
    const apiEndpoint = "http://data.fixer.io/api/latest";
    const url = [
        apiEndpoint,
        Object.keys(params)
        .map( param => `${param}=${params[param]}` )
        .join( "&" )
    ].join( "?" );

    let response = await axios.get(url);
    if (response.data.success) { return response.data }
    else { throw new Error('Unsuccessful PAI call') }
}

export default httpTrigger