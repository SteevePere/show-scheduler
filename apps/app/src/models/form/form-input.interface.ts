import { Rule } from 'antd/lib/form';

export interface IinputValidationRule {
  required: boolean,
  message: string,
};

export interface IFormInput {
  key: string;
  label: string,
  name: string,
  valuePropName?: string | undefined,
  rules?: Rule[],
  dependencies?: string[],
  children?: JSX.Element | undefined,
};