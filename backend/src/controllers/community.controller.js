const Community = require('../models/Community.js');
const Course = require('../models/Course.js');

exports.getCommunity = async (req, res) => {
  const { courseId } = req.params;
  try {
    const community = await Community.findOne({ course: courseId })
      .populate('members', 'name email')
      .populate('messages.sender', 'name');

    if (!community) return res.json({ messages: [] });

    res.json({ messages: community.messages, members: community.members });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendMessage = async (req, res) => {
  const { courseId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  try {
    let community = await Community.findOne({ course: courseId });
    if (!community) {
      community = new Community({ course: courseId, members: [userId], messages: [] });
    }

    if (!community.members.includes(userId)) community.members.push(userId);

    const newMessage = { sender: userId, content };
    community.messages.push(newMessage);
    await community.save();

    const populatedMessage = await community.populate('messages.sender', 'name');
    res.json(populatedMessage.messages.slice(-1)[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
