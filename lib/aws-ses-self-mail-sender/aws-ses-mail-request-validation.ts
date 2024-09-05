import { validateFormRequest } from 'form-request-validation'

import { defaultFieldOptions } from './aws-ses-mail-config'
import type { DefaultFieldOptions, EmailRequest } from './types'

export const validateEmailRequest = (
  emailRequest: EmailRequest,
  fieldOptions: DefaultFieldOptions,
): { field: string; errorMessage: string }[] => {
  return validateFormRequest<EmailRequest>(
    emailRequest,
    fieldOptions,
    defaultFieldOptions,
  )
}
