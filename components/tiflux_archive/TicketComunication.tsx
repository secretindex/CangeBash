import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Download } from "lucide-react";

interface Attachment {
  id: number;
  url: string;
  size: number;
  file_name: string;
  content_type: string;
}

interface Message {
  answer_origin: string;
  answer_time: string;
  author: string;
  files?: Attachment[] | Attachment | null;
  files_count: number;
  id: number;
  name: string;
  ticket_number: number;
  user_id: number;
  uuid: string;
}

interface TicketCommunicationProps {
  messages: Message[];
}

function formatBytes(bytes?: number) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function TicketCommunication({ messages }: TicketCommunicationProps) {
  return (
    <Card className="w-full shadow-none">
      <CardContent>
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const attachments: Attachment[] = Array.isArray(message.files)
                ? (message.files as Attachment[])
                : message.files
                  ? [message.files as Attachment]
                  : [];

              return (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-indigo-200">
                        <span className="font-bold text-indigo-500">
                          {message.author.charAt(0).toUpperCase()}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {message.author}
                        </span>
                        {message.user_id === 0 && (
                          <Badge variant="outline" className="text-xs">
                            Cliente
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-1">
                        {new Date(message.answer_time).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        <div
                          dangerouslySetInnerHTML={{ __html: message.name }}
                        />
                      </div>

                      {attachments.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {attachments.map((file) => (
                            <a
                              key={file.id}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="inline-flex items-center gap-2 px-2 py-1 rounded border bg-white hover:bg-gray-50 text-sm"
                            >
                              <Download className="w-4 h-4 text-gray-600" />
                              <span className="max-w-[180px] truncate">
                                {file.file_name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatBytes(file.size)}
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
