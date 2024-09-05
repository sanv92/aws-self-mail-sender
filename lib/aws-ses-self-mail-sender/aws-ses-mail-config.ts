import {
  createValidationRegex,
  LanguageValidationRules,
} from 'form-request-validation'
import type { FieldOptions } from 'form-request-validation'
import { ValidationRules } from './form-pattern'
import type { DefaultFieldOptions } from './types'

const emailFrom: FieldOptions = {
  name: 'Email From',
  required: true,
  validation: true,
  minLength: 3,
  maxLength: 78,
  pattern: ValidationRules.EmailPattern,
  errorMessage: 'Please provide a valid email address.',
}

const phoneNumber: FieldOptions = {
  name: 'Phone',
  required: false,
  validation: true,
  pattern: ValidationRules.PhonePattern,
  errorMessage: 'Please provide a valid phone number.',
}

const firstName: FieldOptions = {
  name: 'First Name',
  required: false,
  validation: true,
  minLength: 2,
  maxLength: 100,
  pattern: createValidationRegex(
    ValidationRules.NumericPattern,
    ValidationRules.SpecialCharacterPattern,
    LanguageValidationRules.LatinAlphabetPattern,
  ),
  errorMessage: 'Please provide a valid first name.',
}

const lastName: FieldOptions = {
  name: 'Last Name',
  required: false,
  validation: true,
  minLength: 2,
  maxLength: 100,
  pattern: createValidationRegex(
    ValidationRules.NumericPattern,
    ValidationRules.SpecialCharacterPattern,
    LanguageValidationRules.LatinAlphabetPattern,
  ),
  errorMessage: 'Please provide a valid last name.',
}

const subject: FieldOptions = {
  name: 'Subject',
  required: false,
  validation: true,
  minLength: 2,
  maxLength: 255,
  pattern: createValidationRegex(
    ValidationRules.NumericPattern,
    ValidationRules.SpecialCharacterPattern,
    LanguageValidationRules.LatinAlphabetPattern,
  ),
  errorMessage: 'Please provide a valid subject.',
}

const message: FieldOptions = {
  name: 'Message',
  required: false,
  validation: true,
  minLength: 30,
  maxLength: 3000,
  pattern: createValidationRegex(
    ValidationRules.NumericPattern,
    ValidationRules.SpecialCharacterPattern,
    LanguageValidationRules.LatinAlphabetPattern,
  ),
  errorMessage: 'Please provide a valid message.',
}

const companyName: FieldOptions = {
  name: 'Company Name',
  required: false,
  validation: true,
  minLength: 3,
  maxLength: 1000,
  pattern: createValidationRegex(
    ValidationRules.NumericPattern,
    ValidationRules.SpecialCharacterPattern,
    LanguageValidationRules.LatinAlphabetPattern,
  ),
  errorMessage: 'Please provide a valid company name.',
}

const address: FieldOptions = {
  name: 'Address',
  required: false,
  validation: true,
  minLength: 10,
  maxLength: 1000,
  pattern: createValidationRegex(
    ValidationRules.NumericPattern,
    ValidationRules.SpecialCharacterPattern,
    LanguageValidationRules.LatinAlphabetPattern,
  ),
  errorMessage: 'Please provide a valid address.',
}

const preferredContactMethod: FieldOptions = {
  name: 'Preferred Contact Method',
  required: false,
  validation: true,
  pattern: ValidationRules.PreferredContactMethodPattern,
  errorMessage: 'Please select a valid contact method.',
}

export const defaultFieldOptions: DefaultFieldOptions = {
  emailFrom,
  firstName,
  lastName,
  phoneNumber,
  subject,
  message,
  companyName,
  address,
  preferredContactMethod,
}
