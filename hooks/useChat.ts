import { useAuth } from "@/contexts/AuthContext";
import chatService from "@/services/chat.service";
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
            if ( newMessage.senderId !== user?.id) {
                chatService.markAsRead(conversationId);
            }
        });
        return unsubscribe;
    },  [conversationId, user?.id]);

    //s'abonner aux indicateurs de frappe
    useEffect(() => {
        const unsbscribe = chatService.subscribeToTyping(
            conversationId,
            (userId, isTyping) => {
                if (userId !== user?.id) {
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
    }, [conversationId, user?.id]);

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
            if(user?.id) {
                await chatService.sendTypingIndicator(conversationId, user.id, isTyping);
            }
        },
        [conversationId, user?.id]
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