import { ValidationRules as FormValidationRules } from 'form-request-validation'
import type { PreferredContactMethod } from './types'

const preferredContactMethodOptions = (): PreferredContactMethod[] => [
  'email',
  'phone',
  'sms',
  'postalMail',
  'fax',
  'whatsapp',
  'telegram',
  'viber',
  'skype',
  'wechat',
  'signal',
  'line',
  'google hangouts',
  'zoom',
  'microsoft teams',
]

const createPreferredContactMethodRegex = (): RegExp => {
  return new RegExp(`^(${preferredContactMethodOptions().join('|')})$`, 'i')
}

export const ValidationRules = {
  ...FormValidationRules,
  PreferredContactMethodPattern: createPreferredContactMethodRegex(),
}
