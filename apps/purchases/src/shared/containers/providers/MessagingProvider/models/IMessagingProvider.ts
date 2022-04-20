import { ISendMessageDTO } from "../dto/ISendMessage";

export interface IMessagingProvider {
  sendMessage(data: ISendMessageDTO): Promise<void>;
}
