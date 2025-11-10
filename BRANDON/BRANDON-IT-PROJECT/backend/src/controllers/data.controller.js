const Data = require('../models/Data.model');

// @desc    Get all data items
// @route   GET /api/data
// @access  Private
exports.getAllData = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const data = await Data.find(query)
      .populate('createdBy', 'firstName lastName email')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Data.countDocuments(query);

    res.status(200).json({
      success: true,
      data: data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single data item
// @route   GET /api/data/:id
// @access  Private
exports.getData = async (req, res, next) => {
  try {
    const data = await Data.findById(req.params.id)
      .populate('createdBy', 'firstName lastName email');

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      });
    }

    // Increment views
    data.metadata.views += 1;
    await data.save();

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new data item
// @route   POST /api/data
// @access  Private
exports.createData = async (req, res, next) => {
  try {
    const { title, description, category, status, tags } = req.body;

    const data = await Data.create({
      title,
      description,
      category,
      status,
      tags,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Data created successfully',
      data: data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update data item
// @route   PUT /api/data/:id
// @access  Private
exports.updateData = async (req, res, next) => {
  try {
    let data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      });
    }

    // Check ownership or admin role
    if (data.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this data'
      });
    }

    const { title, description, category, status, tags } = req.body;

    data.title = title || data.title;
    data.description = description || data.description;
    data.category = category || data.category;
    data.status = status || data.status;
    data.tags = tags || data.tags;
    data.metadata.lastModified = Date.now();

    await data.save();

    res.status(200).json({
      success: true,
      message: 'Data updated successfully',
      data: data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete data item
// @route   DELETE /api/data/:id
// @access  Private
exports.deleteData = async (req, res, next) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      });
    }

    // Check ownership or admin role
    if (data.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this data'
      });
    }

    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Data deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's data items
// @route   GET /api/data/my-data
// @access  Private
exports.getMyData = async (req, res, next) => {
  try {
    const data = await Data.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    next(error);
  }
};
