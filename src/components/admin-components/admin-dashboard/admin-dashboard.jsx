import React, { Suspense } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Spinner } from "../../with-spinner/with-spinner";
import AdminDashboardUsers from "../admin-dashboard-users/admin-dashboard-users";
import AdminDashboardCollections from "../../admin-dashboard-collections/admin-dashboard-collections";
import AdminDashboardOrders from "../admin-dashboard-orders/admin-dashboard-orders";
import AdminDashboardSlider from "../admin-dashboard-slider/admin-dashboard-slider";
import AdminDashboardActivity from "../admin-dashboard-activity/admin-dashboard-activity";

import { Layout, Menu, Button } from 'antd';
import { 
    UserOutlined, 
    ShoppingCartOutlined, 
    UnorderedListOutlined, 
    PictureOutlined,
    BellOutlined,
    ImportOutlined,
} from '@ant-design/icons';

import "./admin-dashboard.scss";
import { useCallback, useEffect } from "react";

const { Header, Content, Footer, Sider } = Layout;

const AdminDashboard = (props) => {

    const handleRedirectToUsers = () => <Redirect to={`${props.match.path}/users`} />

    const handleRedirect = useCallback(() => {
        return props.currentAdmin.name ? null : props.history.push("/admin/signin")
    }, [props])

    useEffect(() => {
        handleRedirect()
    }, [handleRedirect])

    return (
        <div className="admin-dashboard" >
            <Layout hasSider>
                <Sider
                    style={{ 
                        position: 'fixed', 
                        overflow: 'auto',
                        height: '100vh',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className="logo" >
                        {props.currentAdmin.name}
                    </div>
                    <Menu style={{ height: "80%" }} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to={`${props.match.path}/users`} >Users</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                            <Link to={`${props.match.path}/collections`} >Collections</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                            <Link to={`${props.match.path}/orders`} >Orders</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<PictureOutlined />}>
                            <Link to={`${props.match.path}/sliders`} >Sliders</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<BellOutlined />}>
                            <Link to={`${props.match.path}/activity`} >Activity</Link>
                        </Menu.Item>
                    </Menu>
                    <div className="log-out-button-container" >
                        <Button className="log-out-button" type="primary" onClick={() => window.localStorage.removeItem('token')}>
                            <ImportOutlined />
                            <a href="/admin" >Log out</a>
                        </Button>
                    </div>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh" }} >
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24 }}>
                        <Switch>
                            <Suspense fallback={<Spinner/>} >
                                <Route exact path = {`${props.match.path}`} component = {handleRedirectToUsers} />
                                <Route path = {`${props.match.path}/users`} component = {AdminDashboardUsers} />
                                <Route path = {`${props.match.path}/collections`} component = {AdminDashboardCollections} />
                                <Route path = {`${props.match.path}/orders`} component = {AdminDashboardOrders} />
                                <Route path = {`${props.match.path}/sliders`} component = {AdminDashboardSlider} />
                                <Route path = {`${props.match.path}/activity`} component = {AdminDashboardActivity} />
                            </Suspense>
                        </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminDashboard;