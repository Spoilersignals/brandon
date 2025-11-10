const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['general', 'technical', 'academic', 'personal', 'other']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metadata: {
    views: {
      type: Number,
      default: 0
    },
    lastModified: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Index for search
dataSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Data', dataSchema);
