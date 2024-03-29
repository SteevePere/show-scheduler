import {
  EditOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { Component } from 'react';

import SignOutButton from '../../components/auth/SignOut/SignOutButton/SignOutButton';
import ProfileButton from '../../components/profile/ProfileButton/ProfileButton';
import Logo from '../Logo/Logo';
import SideMenu from '../SideMenu/SideMenu';

import './UserLayout.css';

const { Header, Content, Footer, Sider } = Layout;

interface UserLayoutProps {
  content: Component;
};

export interface MenuItem {
  key: string;
  icon: JSX.Element;
  name: string;
  to: string;
};

const UserLayout = (props: UserLayoutProps) => {
  const {
	  content,
  } = props;

  const menuItems: MenuItem[] = [
	  {
	    key: 'posts',
	    icon: <EditOutlined/>,
	    name: 'Posts',
	    to: '/posts',
	  },
  ];

  return (
    <Layout
      style={{ height: '100vh' }}
    >
      <Sider
        theme='light'
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={() => undefined}
        onCollapse={() => undefined}
      >
        <Logo/>
        <SideMenu
          {...props}
          menuItems={menuItems}
          theme='light'
        />
      </Sider>
      <Layout
        style={{
          background: '#f7f7f7',
        }}
      >
        <Header
          className='site-layout-sub-header-background'
          style={{
            padding: 0,
            textAlign: 'right'
          }}
        >
          <ProfileButton/>
          <SignOutButton/>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            textAlign: 'center',
          }}
        >
          <>
            {content}
          </>
        </Content>
        <Footer
          style={{ textAlign: 'center' }}
        >
          <small>
			      ©Show-Scheduler 2022
          </small>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;