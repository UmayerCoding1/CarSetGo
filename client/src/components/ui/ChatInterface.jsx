import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Minimize2,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useGetMessage from "../../hooks/useGetMessage";
import useSecureApi from "../../hooks/useSecureApi";
import useAuth from "../../hooks/useAuth";

const ChatInterface = ({
  isOpen,
  onClose,
  sellerName,
  sellerAvatar,
  sellerId,
  userId,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSendBtn, setShoeSendBtn] = useState(true);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { messages, getMessageRefetch } = useGetMessage(sellerId);
  const secureApi = useSecureApi();
  const {user} = useAuth();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) return;
    setShoeSendBtn(false);
    try {
      const res = await secureApi.post(`/send-message/${sellerId}`, {
        message,
      });
      if (res.data.success) {
        setShoeSendBtn(true);
        getMessageRefetch();
      }
    } catch (error) {
      console.log(error);
    }

    setMessage("");
    setSelectedImage(null);
  };

  const renderMessage = (msg) => {
    if (msg.type === "image") {
      return (
        <div className="relative group">
          <img
            src={msg.image}
            alt="Shared image"
            className="max-w-[250px] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.open(msg.image, "_blank")}
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" /> */}
        </div>
      );
    }
    return <p className="text-sm">{msg.message}</p>;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 lg:w-[400px] bg-white rounded-lg shadow-xl z-50"
        >
          {/* Chat Header */}
          <div className="bg-black text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sellerAvatar ? (
                <img
                  src={sellerAvatar}
                  alt={sellerName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300" />
              )}
              <span className="font-medium">{sellerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-gray-700 p-1 rounded"
              >
                {isMinimized ? (
                  <Maximize2 size={16} />
                ) : (
                  <Minimize2 size={16} />
                )}
              </button>
              <button
                onClick={onClose}
                className="hover:bg-gray-700 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages Area */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.length > 0 ? (
                    <>
                      {messages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`flex items-start gap-2 ${
                            msg.senderId === userId ? "flex-row-reverse" : ""
                          }`}
                        >
                          {msg.senderId === sellerId ? (
                            sellerAvatar ? (
                              <img
                                src={sellerAvatar}
                                alt={sellerName}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-300" />
                            )
                          ) : (
                            <img
                                src={user?.avatar}
                                alt={sellerName}
                                className="w-8 h-8 rounded-full"
                              />
                          )}
                          <div
                            className={`p-2 rounded-lg shadow-sm max-w-[80%] ${
                              msg.sender === "user"
                                ? "bg-black text-white"
                                : "bg-white"
                            }`}
                          >
                            {renderMessage(msg)}
                            <span
                              className={`text-xs ${
                                msg.sender === "user"
                                  ? "text-gray-300"
                                  : "text-gray-500"
                              }`}
                            >
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  ) : (
                    <div className="flex items-center justify-center  text-gray-500">Message not found</div>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="p-3 border-t border-b bg-gray-50">
                  <div className="relative inline-block">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-32 rounded-lg"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-gray-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <form onSubmit={handleSubmit} className="p-3 border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <button
                    disabled={!showSendBtn}
                    type="submit"
                    className="bg-black text-white p-2 rounded-lg hover:bg-gray-800"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
