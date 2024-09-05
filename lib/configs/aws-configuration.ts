import { EnvAwsSesSelfMailSenderManager } from '../env'

interface AWSConfiguration {
  AWS_REGION: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
}

export const awsConfiguration = (): AWSConfiguration => {
  const AWS_REGION = EnvAwsSesSelfMailSenderManager.getAwsRegion()
  if (!AWS_REGION) {
    throw new Error('AWS_REGION')
  }

  if (AWS_REGION.length <= 1) {
    throw new Error('AWS_REGION')
  }

  const AWS_ACCESS_KEY_ID = EnvAwsSesSelfMailSenderManager.getAwsAccessKeyId()
  if (!AWS_ACCESS_KEY_ID) {
    throw new Error('AWS_ACCESS_KEY_ID')
  }

  if (AWS_ACCESS_KEY_ID && AWS_ACCESS_KEY_ID.length <= 1) {
    throw new Error('AWS_ACCESS_KEY_ID')
  }

  const AWS_SECRET_ACCESS_KEY =
    EnvAwsSesSelfMailSenderManager.getAwsSecretAccessKey()
  if (!AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS_SECRET_ACCESS_KEY')
  }

  if (AWS_SECRET_ACCESS_KEY && AWS_SECRET_ACCESS_KEY.length <= 1) {
    throw new Error('AWS_SECRET_ACCESS_KEY')
  }

  return {
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
  }
}
