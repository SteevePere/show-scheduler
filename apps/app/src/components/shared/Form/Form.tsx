import { RegistrationRequest, UpdateUserRequest } from '@scheduler/shared';
import { Form as AntForm, Button, FormInstance } from 'antd';
import { FieldData } from 'models/form/field-data.interface';
import { useCallback, useEffect, useState } from 'react';

import { IFormInput } from '../../../models/form/form-input.interface';

type HandlerType = RegistrationRequest & UpdateUserRequest;

const { Item: AntFormItem } = AntForm;

interface IUserFormProps {
  inputs: IFormInput[];
  form?: FormInstance;
  loading: boolean;
  disabled: boolean;
  fields?: string[] | undefined;
  isSubmitSuccess?: string | null;
  cta?: string | undefined;
  extraInputs?: IFormInput[] | undefined;
  handler: (values: HandlerType) => void;
}

export const Form = (props: IUserFormProps) => {
  const {
    inputs,
    form,
    fields,
    loading,
    disabled,
    extraInputs = [],
    cta,
    isSubmitSuccess,
    handler
  } = props;

  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccess) {
      setIsTouched(false);
    }
  }, [isSubmitSuccess]);

  const handleFieldsChange = useCallback((changedFields: FieldData[], allFields: FieldData[]) => { // not updating after a submit, deps?
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
  }, [setIsTouched]);

  const renderFields = () => {
    const getFormItem = (input: IFormInput) => {
      return (<AntFormItem
        key={input.key}
        label={input.label}
        name={input.name}
        initialValue={input.initialValue}
        rules={input.rules}
      >
        {input.children}
      </AntFormItem>); 
    };

    const fieldsToRender = inputs.map((input) => {
      if (fields && fields.includes(input.name) || !fields) {
        return getFormItem(input);
      }
      return null;
    });

    return fieldsToRender.concat(extraInputs.map((input) => getFormItem(input)));
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