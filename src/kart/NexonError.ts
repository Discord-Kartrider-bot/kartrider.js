import {HandlerFunction, HTTPError} from 'got'

const NexonHTTPErrorMessage: {[key:number]: string}  = {
400: 'Bad Request',
401: 'Unavailable Service/Service Type',
403: 'Unallowed AccessToken',
404: 'Not Found (return null)',
405: 'Unavailable API',
413: 'Request Parameter is Long',
429: 'Getting Rate Limited',
500: 'Internal Server Error',
504: 'Internal Server Timeout'
}

const StatusCodeErrorHandler: HandlerFunction = async (options,next) => {
    try{
        const response = await next(options);
        return <any> response;
    }catch (error) {
       const {response} = error as HTTPError;
       const HTTPStatusCode: number = response.statusCode;
       if(error instanceof HTTPError && HTTPStatusCode >= 400){
           error.name = 'NexonHTTPError'
            if(HTTPStatusCode === 404) return response;
            else error.message = `${NexonHTTPErrorMessage[HTTPStatusCode]} (StatusCode: ${HTTPStatusCode})`
        }
        throw error
    }
}

export {NexonHTTPErrorMessage,StatusCodeErrorHandler}