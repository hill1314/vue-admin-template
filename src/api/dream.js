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

export function addDetail(detailList) {
    return request({
        url: `/dream/addDetail`,
        method: 'post',
        data: detailList //data表示用json形式传，非json用param
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