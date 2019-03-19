module.exports = (extension) => {
  const controller = {};

  const AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: extension.settings.accessKeyId,
    secretAccessKey: extension.settings.secretAccessKey,
    region: extension.settings.region,
  });
  const email = new AWS.SES();

  controller.send = async (to, subject, message, altText) => {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
          Text: {
            Charset: 'UTF-8',
            Data: altText,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: extension.settings.sender,
    };
    return email.sendEmail(params).promise();
  };

  return controller;
};
