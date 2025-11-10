import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import Header from '../common/Header'
import dataService from '../../services/data.service'
import useAuth from '../../hooks/useAuth'
import './Dashboard.css'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    status: 'draft',
    tags: ''
  })

  const { user } = useAuth()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await dataService.getMyData()
      setData(response.data)
    } catch (error) {
      toast.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const dataToSubmit = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      if (editingItem) {
        await dataService.updateData(editingItem._id, dataToSubmit)
        toast.success('Data updated successfully')
      } else {
        await dataService.createData(dataToSubmit)
        toast.success('Data created successfully')
      }

      fetchData()
      resetForm()
      setShowModal(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      status: item.status,
      tags: item.tags.join(', ')
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await dataService.deleteData(id)
        toast.success('Data deleted successfully')
        fetchData()
      } catch (error) {
        toast.error('Failed to delete data')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'general',
      status: 'draft',
      tags: ''
    })
    setEditingItem(null)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.firstName}!</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
          >
            <FiPlus /> Add New
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <p>No data found. Create your first item!</p>
          </div>
        ) : (
          <div className="data-grid">
            {data.map((item) => (
              <div key={item._id} className="data-card">
                <div className="data-card-header">
                  <h3>{item.title}</h3>
                  <span className={`badge badge-${item.status}`}>
                    {item.status}
                  </span>
                </div>
                <p className="data-description">{item.description}</p>
                <div className="data-meta">
                  <span className="category">{item.category}</span>
                  <div className="data-tags">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="data-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleEdit(item)}
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(item._id)}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingItem ? 'Edit Item' : 'Create New Item'}</h2>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter title"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Enter description"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="general">General</option>
                      <option value="technical">Technical</option>
                      <option value="academic">Academic</option>
                      <option value="personal">Personal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. important, work, project"
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
