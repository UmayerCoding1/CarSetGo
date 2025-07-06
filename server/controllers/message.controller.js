import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();
    //implement  socket io

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      conversation: gotConversation,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json({
        success: false,
        message: "No conversation found",
      });
    }

    return res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
