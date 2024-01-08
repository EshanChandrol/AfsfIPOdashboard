import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, theme,Button } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { DesktopOutlined, CalendarOutlined, HomeOutlined, PoweroffOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    path,
    label,
    children,
  };
}

const items = [
  getItem('Home', '1', <HomeOutlined />, '/'),
  getItem('Upcoming IPOs', '2', <CalendarOutlined />, '/upcomingIPOs'),
];

// Inside the AppLayout component

const AppLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('username') !== null);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const location = useLocation();
  
    // Extract the path from the location
    const currentPath = location.pathname;
  
    const handleLogout = () => {
      localStorage.removeItem('username');
      setIsLoggedIn(false);
      window.location.reload();
    };
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <h2 style={{ padding: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'white' }}>
            Stock
          </h2>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }} >
            Stock Application
            {isLoggedIn ? (
              <Button
                style={{ float: 'right', marginTop: 15, marginRight: 15 }}
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={handleLogout}
              />
            ) : null}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {currentPath.split('/').map((segment, index, array) => {
                const url = array.slice(0, index + 1).join('/');
                const item = items.find((item) => item.path === url);
                return (
                  <Breadcrumb.Item key={index}>
                    {item ? <Link to={item.path}>{item.label}</Link> : segment}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
  
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="responsive-container"
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            AFSD Stock application ©{new Date().getFullYear()} Created by Eshan
          </Footer>
        </Layout>
      </Layout>
    );
  };
  
  export default AppLayout;
  