import { request } from "./request"

/**
 * 
 * @param {访问路径} url 
 * @param {*} params 
 * @returns 
 */
export const uploadFile = (url, params) => {
    return request({
        method: "POST",
        url: url,
        data: params,
        headers: {
            "Content-Type": "multipart/from-data"
        }
    })
}