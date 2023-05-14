import request from '@/utils/request'

export function getByParentId(id) {
    return request({
        url: `/admin/dic/findByParentId/${id}`,
        method: 'get',
        data: '' //data表示用json形式传，非json用param
    })
}

export function getDicList(currPage, pageSize, searchObj) {
    return request({
        url: `/admin/dic/findByPage/${currPage}/${pageSize}`,
        method: 'post',
        data: searchObj //data表示用json形式传，非json用param
    })
}
export function getDicById(id) {
    return request({
      url: `/admin/dic/get/${id}`,
      method: 'get',
      data: {} //data表示用json形式传，非json用param
    })
  }

export function addDic(dic) {
    return request({
        url: `/admin/dic/save`,
        method: 'post',
        data: dic //data表示用json形式传，非json用param
    })
}

export function updateDic(dic) {
    return request({
        url: `/admin/dic/update`,
        method: 'post',
        data: dic //data表示用json形式传，非json用param
    })
}