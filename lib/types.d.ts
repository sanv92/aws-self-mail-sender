declare global {
  interface Env {
    AWS_SES_SELF_EMAIL_TO: string
    AWS_SES_SELF_EMAIL_NAME: string
    AWS_REGION: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}

export {}