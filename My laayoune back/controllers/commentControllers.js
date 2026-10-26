import Comment from "../models/Comment";
import Business from "../models/business";

const createComment = async (req, res, next) => {
  try {
    const { description, slug, parent, replyOnUser } = req.body;

    const business = await Business.findOne({ slug: slug });

    if (!business) {
      const error = new Error("Post was not found");
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      description,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { description } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    comment.description = description || comment.description;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    return res.json({
      message: "Comment is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createComment, updateComment, deleteComment };