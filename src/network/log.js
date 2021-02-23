import {
    request
} from "./request"

export function queryLogList(log, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: '/syslog/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: log
    })
}