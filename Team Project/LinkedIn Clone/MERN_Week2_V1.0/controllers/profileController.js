exports.getProfile = (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user
  });
};


exports.updateProfile = (req, res) => {
  const updates = req.body;

  res.json({
    message: "Profile updated successfully",
    updatedData: updates,
    user: req.user
  });
};