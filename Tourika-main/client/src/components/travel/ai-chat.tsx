import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Send, Bot } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm ready to plan your perfect trip. What's your destination?"
    },
    {
      role: "user", 
      content: "I want to visit Japan for 7 days with a $3000 budget"
    },
    {
      role: "assistant",
      content: "Perfect! I've found amazing options for you. Here's your personalized itinerary..."
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, 
        { role: "user", content: inputMessage },
        { role: "assistant", content: data.response }
      ]);
      setInputMessage("");
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      chatMutation.mutate(inputMessage);
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-2xl max-w-md mx-auto lg:mx-0">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground" data-testid="text-ai-assistant-name">Tourika AI</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-ai-assistant-subtitle">Your travel assistant</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`ai-chat-bubble p-3 rounded-lg ${
                message.role === "assistant" 
                  ? "bg-muted text-foreground" 
                  : "bg-primary text-white ml-8"
              }`}
              data-testid={`chat-message-${index}`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
          {chatMutation.isPending && (
            <div className="ai-chat-bubble bg-muted rounded-lg p-3">
              <p className="text-sm text-foreground">Thinking...</p>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1"
            disabled={chatMutation.isPending}
            data-testid="input-chat-message"
          />
          <Button 
            type="submit" 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            disabled={chatMutation.isPending || !inputMessage.trim()}
            data-testid="button-send-message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
