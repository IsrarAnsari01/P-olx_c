import React, { useState, useEffect } from 'react'
import { Container, Header, Left, Body, Right, Card, CardItem, Content, Icon } from 'native-base'
import { Image } from 'react-native'
import UpdateUserInfoForm from './Forms/UpdateUserInfoForm'
import {View} from 'react-native'
export default function UpdateUserInfo({ route, navigation }) {
    const { userInformation } = route.params
    const [userInfo, setUserInfo] = useState(null)
    const getUserInfo = () => {
        setUserInfo(userInformation)
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    return <>
        <Container>
            <Header style={{ backgroundColor: '#3e4a43' }}>
                <Left>
                    <Icon name='arrow-back' onPress={() => navigation.goBack()} style={{ color: "white" }} />
                </Left>
                <Body />
            </Header>
            <Content>
                <View style = {{backgroundColor: '#3e4a43' }}>
                    {userInfo && <Image source={{ uri: `${userInfo.userImageUrl}` }} style={{ height: 300, flex: 1, borderTopLeftRadius: 150, borderBottomRightRadius: 150 }} />}
                    {userInfo && <UpdateUserInfoForm userInformation={userInfo} navigation = {navigation} />}
                </View>
            </Content>
        </Container>
    </>

}
