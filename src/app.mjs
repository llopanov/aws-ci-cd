
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-2:708466317639:sns-UploadsNotificationTopic';
// Initialize the SNS service
//const sns = new AWS.SNS();
const sns = new SNSClient({region: 'us-east-2'});

export const handler = async (event) => {
    try {
        console.log("SQS Event received:", JSON.stringify(event));
        
        const results = await Promise.all(
            event.Records.map(async (record) => {
              const message = record.body;
              console.log('Publish message', message);
              const command = new PublishCommand({
                TopicArn: SNS_TOPIC_ARN,
                Message: message,
                Subject: "New SQS Message",
              });
      
              const response = await sns.send(command);
              console.log("Published to SNS:", response.MessageId);
              return response;
            })
          );
      
          return {
            statusCode: 200,
            body: JSON.stringify({ publishedMessages: results.length }),
          };

    } catch (error) {
        console.error("Error sending message to SNS topic:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to send message",
                details: error.message,
            }),
        };
    }
};