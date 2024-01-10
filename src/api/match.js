import request from '@/utils/request'

const MatchApi = {
    InRegulation : '/in_regulation/list',
    ExRegulation : '/ex_regulation/list',
    RegulationMatch : '/regulation/match'
}

export function getInRegulationList() {
    return request({
        url: MatchApi.InRegulation,
        method: 'get'
    })
}

export function getExRegulationList(){
    return request({
        url: MatchApi.ExRegulation,
        method: 'get',
    })
}

export function match(data) {
    return request({
        url: MatchApi.RegulationMatch,
        method: 'post',
        data: data
    })
}