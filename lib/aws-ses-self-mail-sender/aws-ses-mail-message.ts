import dedent from 'dedent'
import type { EmailRequest } from './types'

export const formatMailMessageBody = (emailRequest: EmailRequest): string => {
  const senderMessage = formatMailSenderMessage(emailRequest)
  const senderInfo = formatMailSenderInfo(emailRequest)

  return dedent(createMailMessageTemplate(senderMessage, senderInfo)).trim()
}

const createMailMessageTemplate = (
  senderMessage: string,
  senderInfo: string,
) => {
  return `
    You have received a new inquiry from your contact form.

	${senderMessage}

    Sender Information:
    ------------------------------------
    ${senderInfo}
    ------------------------------------

    ---
    This email was sent using Amazon SES.
  `
}

const formatMailSenderInfo = (emailRequest: EmailRequest) => {
  const { emailFrom, firstName, lastName, phoneNumber } = emailRequest
  const { companyName, address, preferredContactMethod } = emailRequest

  return [
    formatField('First Name', firstName),
    formatField('Last Name', lastName),
    formatField('Phone', phoneNumber),
    formatField('Company', companyName),
    formatField('Address', address),
    formatField('Preferred Contact Method', preferredContactMethod.join(',')),
    formatField('Email', emailFrom),
  ]
    .filter(Boolean)
    .join('\n')
    .trim()
}

const formatMailSenderMessage = (emailRequest: EmailRequest): string => {
  const { message } = emailRequest

  if (!message) return ''

  return dedent(`
    ------------------------------------
    ${message}
    ------------------------------------
  `).trim()
}

const formatField = (label: string, value?: string): string => {
  return value ? `${label}: ${value}` : ''
}
