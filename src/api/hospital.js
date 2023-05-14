import request from '@/utils/request'

export function getHospSetList(currPage,pageSize,searchObj) {
  return request({
    url: `/admin/hospital/findByPage/${currPage}/${pageSize}`,
    method: 'post',
    data: searchObj //data表示用json形式传，非json用param
  })
}

export function revertHospitalById(id) {
  return request({
    url: `/admin/hospital/revert/${id}`,
    method: 'post',
    data: {} //data表示用json形式传，非json用param
  })
}

export function removeHospitalById(id) {
  return request({
    url: `/admin/hospital/delete/${id}`,
    method: 'delete',
    data: {} //data表示用json形式传，非json用param
  })
}

export function removeBatch(ids) {
  return request({
    url: `/admin/hospital/deleteBatch`,
    method: 'delete',
    data: ids //data表示用json形式传，非json用param
  })
}

export function addHospital(setting) {
  return request({
    url: `/admin/hospital/save`,
    method: 'post',
    data: setting //data表示用json形式传，非json用param
  })
}