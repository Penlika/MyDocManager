// src/services/notificationService.js
import { SNS } from 'aws-sdk';

const sns = new SNS();
import { SNS } from 'aws-sdk';

export const shareDocument = async (document, recipientEmail) => {
  const params = {
    Message: `A document titled "${document.title}" has been shared with you.`,
    Subject: 'Document Shared',
    TopicArn: 'arn:aws:sns:region:account-id:topic-name',
  };

  try {
    await SNS.publish(params).promise();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendDocumentShareNotification = async (email, documentTitle) => {
  const params = {
    Message: `Document shared: ${documentTitle}`,
    Subject: 'Document Shared',
    TopicArn: 'YourSNSTopicArn', // Replace with your SNS Topic ARN
    MessageAttributes: {
      'email': {
        DataType: 'String',
        StringValue: email,
      },
    },
  };
  await sns.publish(params).promise();
};
