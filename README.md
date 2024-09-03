# AWS Self Mail Sender

A simple utility for sending an email to yourself using AWS SES, perfect for use in "Contact Us" forms and similar scenarios. This package provides an easy-to-use function to send emails directly to your inbox, ensuring that you don't miss important messages from your users.

## Features
- Send emails to yourself using AWS SES
- Ideal for "Contact Us" forms or similar use cases
- Easy to integrate into any Node.js project

## Installation
To install the package, use npm:
```bash
npm install aws-self-mail-sender
```

or with yarn:
```bash
yarn add aws-self-mail-sender
```

## Usage
First, you need to configure your AWS credentials to allow the package to send emails using AWS SES. This can be done by setting up environment variables:
```
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_SES_SELF_EMAIL_TO=your-email@example.com
AWS_SES_SELF_EMAIL_NAME=Your Name
```

```typescript
import { fetchAWSSelfMailSenderRequest } from 'aws-self-mail-sender';

const emailRequest = {
  emailFrom: 'user@example.com',
  subject: 'Contact Us Form Submission',
  message: 'This is a test message from the contact form.',
};

fetchAWSSelfMailSenderRequest(emailRequest)
  .then((response) => {
    console.log('Email sent successfully:', response);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue on GitHub if you find a bug or have a suggestion for improvement.
