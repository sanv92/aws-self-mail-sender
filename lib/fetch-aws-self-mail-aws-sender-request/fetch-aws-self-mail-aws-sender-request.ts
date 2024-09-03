import dedent from 'dedent'
import { XMLParser } from 'fast-xml-parser'
import {
  awsSesSelfMailClientConfiguration,
  awsSESSelfMailConfiguration,
} from '../configs'

interface EmailRequest {
  emailFrom: string
  subject: string
  message: string
}

export const fetchAWSSelfMailSenderRequest = async (
  emailRequest: EmailRequest,
): Promise<string> => {
  const body = createMailSenderRequestBody(emailRequest)
  const response = await fetchSelfMailSenderAPIRequest(body)

  if (!response.ok) {
    throw new Error(`SES error: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()
  return convertXmlToJson(text)
}

const fetchSelfMailSenderAPIRequest = async (
  body: string,
): Promise<Response> => {
  const ses = awsSesSelfMailClientConfiguration()

  return await ses.fetch(`https://email.${ses.region}.amazonaws.com`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
}

const createMailSenderRequestBody = (emailRequest: EmailRequest) => {
  const { subject } = emailRequest
  const { AWS_SES_SELF_EMAIL_TO: toEmail } = awsSESSelfMailConfiguration()

  return new URLSearchParams({
    'Action': 'SendEmail',
    'Source': toEmail,
    'Destination.ToAddresses.member.1': toEmail,
    'Message.Subject.Data': subject,
    'Message.Body.Text.Data': formatMailMessageBody(emailRequest),
    'Version': '2010-12-01',
  }).toString()
}

const formatMailMessageBody = (emailRequest: EmailRequest) => {
  const { emailFrom, message } = emailRequest

  return dedent(`
    You have received a new inquiry from your contact form.

	------------------------------------
    ${message}
    ------------------------------------

    Sender Information:
    ------------------------------------
    Email: ${emailFrom}
    ------------------------------------

    ---
    This email was sent using Amazon SES.
  `).trim()
}

const convertXmlToJson = (xml: string) => {
  try {
    const parser = new XMLParser()
    return parser.parse(xml)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse XML: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred while parsing XML')
    }
  }
}
