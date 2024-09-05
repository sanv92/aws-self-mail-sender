// @ts-ignore
import process from 'process'

const createEnvAwsSesSelfMailSenderManager = () => {
  let env: Env

  return {
    setEnv: (newEnv: Env) => {
      env = newEnv
    },
    getEnv: (): Env => {
      return {
        ...env,
        ...(typeof process !== 'undefined' && typeof process.env !== 'undefined'
          ? process.env
          : {}),
      } as Env
    },
    getAwsRegion: (): string => {
      return env.AWS_REGION || getEnvFromProcess('AWS_REGION', '')
    },
    getAwsAccessKeyId: (): string => {
      return env.AWS_ACCESS_KEY_ID || getEnvFromProcess('AWS_ACCESS_KEY_ID', '')
    },
    getAwsSecretAccessKey: (): string => {
      return (
        env.AWS_SECRET_ACCESS_KEY ||
        getEnvFromProcess('AWS_SECRET_ACCESS_KEY', '')
      )
    },
    getAwsSesEmailTo: (): string => {
      return env.AWS_SES_EMAIL_TO || getEnvFromProcess('AWS_SES_EMAIL_TO', '')
    },
    getAwsSesEmailName: (): string => {
      return (
        env.AWS_SES_EMAIL_NAME || getEnvFromProcess('AWS_SES_EMAIL_NAME', '')
      )
    },
    getAwsSesSubject: (): string => {
      return env.AWS_SES_SUBJECT || getEnvFromProcess('AWS_SES_SUBJECT', '')
    },
  }
}

const getEnvFromProcess = (key: string, fallback: string = ''): string => {
  if (isProcessAvailable()) {
    return process.env[key] || fallback
  }
  return fallback
}

const isProcessAvailable = () =>
  typeof process !== 'undefined' && typeof process.env !== 'undefined'

export const EnvAwsSesSelfMailSenderManager =
  createEnvAwsSesSelfMailSenderManager()
