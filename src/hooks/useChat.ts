import { useAuth } from "@/src/contexts/AuthContext";
import chatService from "@/src/services/chat.service";
import { useCallback, useEffect, useState } from "react";
import { Message } from "../types/chat.types";

export const useChat = (conversationId: string) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

    //changer les messages initiaux
    useEffect(() => {
        loadMessage();
    }, [conversationId]);

    useEffect(() => {
        const unsubscribe = chatService.subscribeToMessages(conversationId, (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);

            //marquer comme lu si le message n'est pas notre messasge
            if ( newMessage.senderId !== user?.uuid) {
                chatService.markAsRead(conversationId);
            }
        });
        return unsubscribe;
    },  [conversationId, user?.uuid]);

    //s'abonner aux indicateurs de frappe
    useEffect(() => {
        const unsbscribe = chatService.subscribeToTyping(
            conversationId,
            (userId, isTyping) => {
                if (userId !== user?.uuid) {
                    setTypingUsers((prev) => {
                        const updated = new Set(prev);
                        if (isTyping) {
                            updated.add(userId);
                        } else {
                            updated.delete(userId);
                        }
                        return updated;
                    });
                }
            }
        );
        return unsbscribe;
    }, [conversationId, user?.uuid]);

    const loadMessage = async () => {
        try {
            setLoading(true);
            const data = await chatService.getMessages(conversationId);
            setMessages(data);
        } catch (error) {
            console.error("Error loading messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (text: string, imageUrl?: string) => {
        try {
            await chatService.sendMessage(conversationId, text, imageUrl);
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    };

    const sendTypingIndicator = useCallback(
        async (isTyping: boolean) => {
            if(user?.uuid) {
                await chatService.sendTypingIndicator(conversationId, user.uuid, isTyping);
            }
        },
        [conversationId, user?.uuid]
    );

    return {
        messages,
        loading,
        typingUsers: Array.from(typingUsers),
        sendMessage,
        sendTypingIndicator,
        refresh: loadMessage,
    }
}