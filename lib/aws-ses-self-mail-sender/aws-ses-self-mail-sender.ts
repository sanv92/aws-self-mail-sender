import {
  awsSesSelfMailClientConfiguration,
  awsSESSelfMailConfiguration,
} from '../configs'
import { formatMailMessageBody } from './aws-ses-mail-message'
import { validateEmailRequest } from './aws-ses-mail-request-validation'
import type { DefaultFieldOptions, EmailRequest } from './types'

export interface EmailResponse {
  success: boolean
  message: string
  errors: { field: string; errorMessage: string }[]
  statusCode: number
}

const createSuccessResponse = (): EmailResponse => {
  return {
    success: true,
    message: 'Validation successful',
    errors: [],
    statusCode: 200,
  }
}

const createErrorResponse = (
  validationErrors: { field: string; errorMessage: string }[],
): EmailResponse => {
  return {
    success: false,
    message: 'Validation failed',
    errors: validationErrors,
    statusCode: 400,
  }
}

export const awsSesSelfMailSender = (fieldOptions: DefaultFieldOptions) => {
  return {
    sendMail: async (emailRequest: EmailRequest): Promise<EmailResponse> => {
      try {
        const validationErrors = validateEmailRequest(
          emailRequest,
          fieldOptions,
        )

        if (validationErrors.length > 0) {
          return createErrorResponse(validationErrors)
        }

        const body = createMailSenderRequestBody(emailRequest)
        const response = await awsSesSelfMailSenderAPIRequest(body)

        if (!response.ok) {
          throw new Error(
            `SES error: ${response.status} ${response.statusText}`,
          )
        }

        return createSuccessResponse()
      } catch (error) {
        throw new Error(
          `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
        )
      }
    },
  }
}

const awsSesSelfMailSenderAPIRequest = async (
  body: string,
): Promise<Response> => {
  const sesConfig = awsSesSelfMailClientConfiguration()

  try {
    return await sesConfig.fetch(
      `https://email.${sesConfig.region}.amazonaws.com`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      },
    )
  } catch (error) {
    throw new Error(
      `Failed to send request to AWS SES: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

const createMailSenderRequestBody = (emailRequest: EmailRequest) => {
  const { emailFrom } = emailRequest
  const { subject = `New Form Submission from [${emailFrom}]` } = emailRequest
  const { AWS_SES_EMAIL_TO: toEmail } = awsSESSelfMailConfiguration()

  return new URLSearchParams({
    'Action': 'SendEmail',
    'Source': toEmail,
    'Destination.ToAddresses.member.1': toEmail,
    'Message.Subject.Data': subject,
    'Message.Body.Text.Data': formatMailMessageBody(emailRequest),
    'Version': '2010-12-01',
  }).toString()
}
