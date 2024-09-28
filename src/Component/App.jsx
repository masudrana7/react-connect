import React, { useState, useEffect } from 'react';
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
import {getOptions, updateOptions} from '../Utilis/Data'
const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [ InputValue, setInPutValue ] = useState([]);
    const [ renderOptions, setReRenderOptions ] = useState(true );

    const onChangeSetUp = (key, value) => {
        const settings = {
            ...InputValue,
            [key]:value
        }
        setInPutValue( settings );
    }

    const getTheOptions = async () => {
        if ( renderOptions ){
          const options = await getOptions();
          await setInPutValue( options );
          await setReRenderOptions( false );
        }
    }

    const onSave = async () => {
        await updateOptions( InputValue );
        await setReRenderOptions( true );
    }

    useEffect(() => {
        getTheOptions();
    }, [renderOptions]);

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