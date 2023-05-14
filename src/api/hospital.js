import request from '@/utils/request'

export function getHospSetList(currPage,pageSize,searchObj) {
  return request({
    url: `/admin/hospital/findByPage/${currPage}/${pageSize}`,
    method: 'post',
    data: searchObj //data表示用json形式传，非json用param
  })
}

export function removeHospitalById(id) {
  return request({
    url: `/admin/hospital/delete/${id}`,
    method: 'post',
    data: {} //data表示用json形式传，非json用param
  })
}