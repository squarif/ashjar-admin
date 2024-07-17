import { gql } from "@apollo/client";

export const SEND_NOTIFICATION = gql`
    mutation SendPushNotification($input: NotificationInput) {
        sendPushNotification(input: $input)
    }
`;