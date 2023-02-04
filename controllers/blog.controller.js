import User from "../model/user.model.js";
import Blog from "../model/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const user = req.user;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(422).json("Invalid inputs");
    }

    const blog = new Blog({
      title,
      description,
      createdBy: user._id,
    });

    const saveBlog = await blog.save();

    res.status(201).json({ blog: saveBlog });

    console.log(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('createdBy', ['name', "email"])
    .sort({createdAt: -1})
    .limit(20);

    if (!blogs) {
      return res.status(404).json("Blog data not found. Blog is now empty");
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editBlog = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.body;

    let blog = await Blog.findById({ _id: id });

    if (!blog) {
      return res.status(404).json("Blog not found");
    }

    const isAuthor =
      JSON.stringify(blog.createdBy) === JSON.stringify(user._id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }

    blog = await Blog.findOneAndUpdate(id, req.body, { new: true, runValidators: true });

    return res.status(201).json({ blog });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;

    let blog = await Blog.findById({ _id: id });

    if (!blog) {
      return res.status(404).json("Blog not found");
    }

    await Blog.findOneAndDelete({_id: id})

    return res.status(200).json("Blog deleted successfully")
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
