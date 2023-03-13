import { notification } from 'antd';
import { ArgsProps, IconType } from 'antd/lib/notification';

interface INotificationProps extends ArgsProps {
    type: IconType;
};

export const openNotification = (data: INotificationProps) => {
  const { message, description, type } = data;

  notification[type]({
    message,
    description,
    placement: 'bottomRight',
  });
};