import request from '@/utils/request'


export function getDreamList(currPage, pageSize, searchObj) {
    return request({
        url: `/dream/list/${currPage}/${pageSize}`,
        method: 'post',
        data: searchObj //data表示用json形式传，非json用param
    })
}

export function getById(id) {
    return request({
        url: `/dream/get/${id}`,
        method: 'get',
        data: {} //data表示用json形式传，非json用param
    })
}

export function createDream(dream) {
    return request({
        url: `/dream/create`,
        method: 'post',
        data: dream //data表示用json形式传，非json用param
    })
}

export function modifyDream(dream) {
    return request({
        url: `/dream/modify`,
        method: 'post',
        data: dream //data表示用json形式传，非json用param
    })
}

export function updateDreamStatus(id, status) {
    return request({
        url: `/dream/updateStatus/${id}/${status}`,
        method: 'post',
        data: null //data表示用json形式传，非json用param
    })
}

export function removeBatch(ids) {
    return request({
        url: `/dream/removeBatch`,
        method: 'delete',
        data: ids //data表示用json形式传，非json用param
    })
}

export function addDetail(detail) {
    return request({
        url: `/dream/addDetail`,
        method: 'post',
        data: detail //data表示用json形式传，非json用param
    })
}

export function addDetailList(detailList) {
    return request({
        url: `/dream/addDetailList`,
        method: 'post',
        data: detailList //data表示用json形式传，非json用param
    })
}

export function modifyDetail(dreamId, content) {
    return request({
        url: `/dream/modify/${dreamId}`,
        method: 'post',
        params: {
            'content':content
        } 
        //data表示用json形式传，非json用param
    })
}

// 根据ID删除明细
export function removeDetailById(id) {
    return request({
        url: `/dream/detail/remove/${id}`,
        method: 'delete',
        data: '' //data表示用json形式传，非json用param
    })
}

// 需求功能点列表
export function getDreamDetailList(dreamId) {
    return request({
        url: `/dream/detail/list/${dreamId}`,
        method: 'post',
        data: '' //data表示用json形式传，非json用param
    })
}

