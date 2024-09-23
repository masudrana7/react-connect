import React, { useState } from 'react';
import {
    Input,
    Layout,
    Menu,
    theme,
    Button ,
    Divider,
    Checkbox
} from 'antd';

const {
    Header,
    Content
} = Layout;
import { updateOptions } from '../Utilis/Data'
const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [ InputValue, setInPutValue ] = useState([]);

    const onChangeSetUp = (key, value) => {
        const settings = {
            ...InputValue,
            [key]:value
        }
        setInPutValue( settings );
    }

    const onSave = async () => {
        await updateOptions( InputValue );
        console.log( InputValue );

    }

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: 'Settings',
                            label: `Settings`,
                        },
                        {
                            key: 'Settings2',
                            label: `Settings 2`,
                        }
                    ]}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Input
                        value={InputValue?.name}
                        onChange={ (e) => {
                            onChangeSetUp('name', e.target.value );
                        } }
                    />
                    <Divider orientation="left" plain>  </Divider>
                    <Checkbox
                        checked={InputValue?.agree}
                        onChange={ (e) => {
                            onChangeSetUp('agree', e.target.checked );
                        } }
                    >Checkbox</Checkbox>
                    <Divider orientation="left" plain>  </Divider>
                    <Button
                        onClick={onSave}
                        className={'rc-button-class'} type="primary" >
                        Save
                    </Button>


                </div>
            </Content>

        </Layout>
    );
};
export default App;