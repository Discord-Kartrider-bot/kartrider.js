import 'cross-fetch/polyfill'
const baseURL = 'https://api.nexon.co.kr/kart/v1.0/';
export const fetchFromAPI = async (urlPath:string,URLInfo:{token:string,HTTPMethod?:string,params?:URLSearchParams}) => {
    let url = baseURL+urlPath;
    if(URLInfo.params) url += "?"+URLInfo.params.toString();
    const fetchResult = await fetch(url.toString(),{
        method: URLInfo.HTTPMethod || "GET",
        headers:{
            'Authorization': URLInfo.token,
        }
    }).then(res=>res.json());
    return fetchResult;
}
