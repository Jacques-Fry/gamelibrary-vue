const root = "/user/syslog";

import {
    request
} from "./request"

export function queryLogList(log, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: root + '/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: log
    })
}