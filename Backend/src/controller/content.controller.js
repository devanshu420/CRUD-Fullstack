import contentModel from "../model/content.model.js";

// Create Content Controller
export const createContentController = async (req, res) => {
  const { title, description } = req.body;

  // console.log({title , description});

  const content = await contentModel.create({
    title,
    description,
  });

  res.json({
    message : "Content Created Successfully",
    content,
  });
};

// Get Content Controller
export const getContentController = async (req, res) => {
  const content = await contentModel.find();

  res.json({ content });
};

// Update Content Controller
export const updateContentController = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const content = await contentModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true },
  );

  res.json({ message : "Content Updated Successfully" ,content });
};

// Delete Content Controller
export const deleteContentController = async (req, res) => {
  const id = req.params.id;
  const content = await contentModel.findByIdAndDelete(id, { new: true });

  res.json({ message: "Content Deleted Successfully" });
};
