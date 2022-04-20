import { producer } from "../producer";
import { IMessagingProvider } from "../models/IMessagingProvider";
import { ISendMessageDTO } from "../dto/ISendMessage";

export class KafkaMessagingProvider implements IMessagingProvider {
  async sendMessage({ topic, message }: ISendMessageDTO) {
    console.log(`[Purchases] New message on topic "${topic}"`);
    console.log(JSON.stringify(message, null, 2));

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
