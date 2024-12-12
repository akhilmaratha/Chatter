import { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedConversation?._id === newMessage.senderId || 
          selectedConversation?._id === newMessage.receiverId) {
        const notification = new Audio(sound);
        notification.play();
        setMessage([...messages, newMessage]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage, selectedConversation]);
};

export default useGetSocketMessage;
