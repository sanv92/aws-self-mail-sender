import { EnvSESSelfMailSenderManager } from '../env'

export interface AwsSesSelfMailConfiguration {
  AWS_SES_SELF_EMAIL_TO: string
  AWS_SES_SELF_EMAIL_NAME: string
}

export const awsSESSelfMailConfiguration = (): AwsSesSelfMailConfiguration => {
  const AWS_SES_SELF_EMAIL_TO =
    EnvSESSelfMailSenderManager.getAwsSESSelfEmailTo()
  if (!AWS_SES_SELF_EMAIL_TO) {
    throw new Error('AWS_SES_SELF_EMAIL_TO')
  }

  if (AWS_SES_SELF_EMAIL_TO.length <= 1) {
    throw new Error('AWS_SES_SELF_EMAIL_TO')
  }

  const AWS_SES_SELF_EMAIL_NAME =
    EnvSESSelfMailSenderManager.getAwsSESSelfEmailToName()
  if (!AWS_SES_SELF_EMAIL_NAME) {
    throw new Error('AWS_SES_SELF_EMAIL_NAME')
  }

  if (AWS_SES_SELF_EMAIL_NAME && AWS_SES_SELF_EMAIL_NAME.length <= 1) {
    throw new Error('AWS_SES_SELF_EMAIL_NAME')
  }

  return {
    AWS_SES_SELF_EMAIL_TO,
    AWS_SES_SELF_EMAIL_NAME,
  }
}
