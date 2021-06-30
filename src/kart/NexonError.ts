
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

export {NexonHTTPErrorMessage}