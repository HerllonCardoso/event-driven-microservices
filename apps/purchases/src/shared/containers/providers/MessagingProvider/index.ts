import { container } from "tsyringe";

import { KafkaMessagingProvider } from "./implementations/KafkaMessagingProvider";
import { IMessagingProvider } from "../../../../../../classroom/src/shared/containers/providers/MessagingProvider/models/IMessagingProvider";

const providers = {
  messagingProvider: container.resolve(KafkaMessagingProvider),
};

container.registerInstance<IMessagingProvider>(
  "MessagingProvider",
  providers.messagingProvider
);
