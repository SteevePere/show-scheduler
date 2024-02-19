import { RegistrationRequest, UpdateUserRequest } from '@scheduler/shared';
import { Form as AntForm, Button, FormInstance } from 'antd';
import { FieldData } from 'models/form/field-data.interface';
import { useCallback, useEffect, useState } from 'react';

import { IFormInput } from '../../../models/form/form-input.interface';

type HandlerType = RegistrationRequest & UpdateUserRequest;

const { Item: AntFormItem } = AntForm;

interface IFormProps {
  inputs: IFormInput[];
  loading: boolean;
  disabled: boolean;
  fields: string[]; // generic
  form?: FormInstance;
  isSubmitSuccess?: string | null;
  cta?: string | undefined;
  handler: (values: HandlerType) => void;
}

export const Form = (props: IFormProps) => {
  const {
    inputs,
    form,
    fields,
    loading,
    disabled,
    cta,
    isSubmitSuccess,
    handler
  } = props;

  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccess || disabled) {
      setIsTouched(false);
    }
  }, [isSubmitSuccess, disabled]);

  const handleFieldsChange = useCallback((changedFields: FieldData[], allFields: FieldData[]) => {
    let isChanged = false;

    allFields.forEach((field) => {
      const fieldName = (field.name as string[])[0];
      const fieldValue = field.value;
      const fieldStringValue = fieldValue?.toString() || undefined;
      const fieldInitValue = inputs.find((input) => input.name === fieldName)?.initialValue;
      
      if (fieldStringValue !== fieldInitValue?.toString()) {
        isChanged = true;
      }
    });

    setIsTouched(isChanged);
  }, [inputs, setIsTouched]);

  const renderFields = () => {
    const getFormItem = (input: IFormInput) => {
      return (
        <AntFormItem
          key={input.key}
          label={input.label}
          name={input.name}
          initialValue={input.initialValue}
          rules={input.rules}
        >
          {input.children}
        </AntFormItem>
      ); 
    };

    return inputs.map((input) => {
      if (fields && fields.includes(input.key)) {
        return getFormItem(input);
      }
      return null;
    });
  };

  return (
    <AntForm
      form={form}
      name='basic'
      labelCol={{ span: 6 }}
      labelAlign='left'
      initialValues={{ remember: true }}
      onFinish={handler}
      autoComplete='on'
      disabled={disabled}
      onFieldsChange={handleFieldsChange}
    >
      {renderFields()}
      <AntFormItem shouldUpdate={true}>
        <Button disabled={!isTouched} block type='primary' htmlType='submit' loading={loading}>
          {cta || 'Submit'}
        </Button>
      </AntFormItem>
    </AntForm> 
  );
};

export default Form;