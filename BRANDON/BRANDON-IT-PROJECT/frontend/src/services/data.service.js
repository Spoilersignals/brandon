import api from './api'

const dataService = {
  async getAllData(params = {}) {
    const response = await api.get('/data', { params })
    return response.data
  },

  async getData(id) {
    const response = await api.get(`/data/${id}`)
    return response.data
  },

  async createData(data) {
    const response = await api.post('/data', data)
    return response.data
  },

  async updateData(id, data) {
    const response = await api.put(`/data/${id}`, data)
    return response.data
  },

  async deleteData(id) {
    const response = await api.delete(`/data/${id}`)
    return response.data
  },

  async getMyData() {
    const response = await api.get('/data/my-data')
    return response.data
  }
}

export default dataService
