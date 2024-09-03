import { awsConfiguration } from './aws-configuration'

import { AwsClient } from 'aws4fetch'

export const awsSesSelfMailClientConfiguration = (): AwsClient => {
  const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
    awsConfiguration()

  return new AwsClient({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
    service: 'ses',
  })
}
