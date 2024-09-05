export interface EmailRequest {
  emailFrom: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  subject?: string
  message?: string
  companyName?: string
  address?: string
  preferredContactMethod?: PreferredContactMethod[]
}

export type PreferredContactMethod =
  | 'email'
  | 'phone'
  | 'sms'
  | 'postalMail'
  | 'fax'
  | 'whatsapp'
  | 'telegram'
  | 'viber'
  | 'skype'
  | 'wechat'
  | 'signal'
  | 'line'
  | 'google hangouts'
  | 'zoom'
  | 'microsoft teams'

export type DefaultFieldOptions = {
  emailFrom: FieldOptions
  firstName?: FieldOptions
  lastName?: FieldOptions
  phoneNumber?: FieldOptions
  subject?: FieldOptions
  message?: FieldOptions
  companyName?: FieldOptions
  address?: FieldOptions
  preferredContactMethod?: FieldOptions
}

export interface FieldOptions {
  name: string
  required: boolean
  validation: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  errorMessage?: string
}
