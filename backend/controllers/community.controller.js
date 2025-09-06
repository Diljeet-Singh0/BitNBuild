const Community = require('../models/Community');
const Course = require('../models/Course');

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
      // create community if it doesn't exist
      community = new Community({ course: courseId, members: [userId], messages: [] });
    }

    // add user to members if not already
    if (!community.members.includes(userId)) community.members.push(userId);

    const newMessage = { sender: userId, content };
    community.messages.push(newMessage);
    await community.save();

    // populate sender for frontend
    const populatedMessage = await community.populate('messages.sender', 'name');

    res.json(populatedMessage.messages.slice(-1)[0]); // return the last message
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
