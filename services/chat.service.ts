import { Conversation } from "@/types/chat.types";
import { RealtimeChannel } from "@supabase/supabase-js";
import { api, handleApiError } from "./api";
import { supabase } from "./supabase";

class ChatService {
    private channels: Map<string, RealtimeChannel> = new Map();

    //recuperer toutes les conversations de l'utilisateur
    async getConversations() : Promise<Conversation[]> {
        try {
            const response = await api.get("/chat/conversations/");
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    //recuperer les messages d'une converasation
    async getConversation(id: string): Promise<Conversation> {
        try {
            const response = await api.get(`/conversations/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    //creer  recuperer une conversation enter deux utilisateurs
    async getOrCreateConversation(otherUserId: string, offerId?:string): Promise<Conversation> {
        try {
            const response = await api.post("/conversations/", {
                otherUserId,
                offerId,
            });
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    //recuperer les message d' une conversation 
    async getMessages(conversationId: string): Promise<Message[]> {
        try {
            const response = await api.get(`/conversations/${conversationId}/messages/`);
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    //envoyer un message
    async sendMessage(conversationId: string, text: string, imageUrl?: string): Promise<Message> {
        try {
            const response = await api.post(`/conversations/${conversationId}/messages/`, {
                text,
                imageUrl,
            });
            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

    //marque les messages comme lus
    async markAsRead(conversationId: string): Promise<void> {
        try {
            await api.post(`/conversations/${conversationId}/mark-read`);
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }

     // S'abonner aux nouveaux messages en temps réel (Supabase Realtime)
  subscribeToMessages(
    conversationId: string,
    onNewMessage: (message: Message) => void
  ): () => void {
    // Créer un channel unique pour cette conversation
    const channelName = `messages:${conversationId}`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          onNewMessage(newMessage);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    // Fonction de nettoyage
    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  // S'abonner aux mises à jour de conversations (pour la liste)
  subscribeToConversations(
    userId: string,
    onUpdate: (conversation: Conversation) => void
  ): () => void {
    const channelName = `conversations:${userId}`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*", // Écouter INSERT, UPDATE, DELETE
          schema: "public",
          table: "conversations",
          filter: `participants.cs.{${userId}}`, // Conversations où l'utilisateur est participant
        },
        (payload) => {
          const conversation = payload.new as Conversation;
          onUpdate(conversation);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  }

  // S'abonner au statut de frappe (typing indicator)
  subscribeToTyping(
    conversationId: string,
    onTypingChange: (userId: string, isTyping: boolean) => void
  ): () => void {
    const channelName = `typing:${conversationId}`;
    
    const channel = supabase.channel(channelName);

    // Écouter les événements de frappe
    channel.on("broadcast", { event: "typing" }, (payload) => {
      onTypingChange(payload.payload.userId, payload.payload.isTyping);
    });

    channel.subscribe();
    this.channels.set(channelName, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelName);
    };
  };

  // Envoyer un événement de frappe
  async sendTypingIndicator(conversationId: string, userId: string, isTyping: boolean) {
    const channelName = `typing:${conversationId}`;
    let channel = this.channels.get(channelName);

    if (!channel) {
      channel = supabase.channel(channelName);
      await channel.subscribe();
      this.channels.set(channelName, channel);
    }

    await channel.send({
      type: "broadcast",
      event: "typing",
      payload: { userId, isTyping },
    });
  }

  // Nettoyer tous les abonnements
  unsubscribeAll() {
    this.channels.forEach((channel) => {
      channel.unsubscribe();
    });
    this.channels.clear();
  }
}

export default new ChatService();
