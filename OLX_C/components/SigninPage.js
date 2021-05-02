import React from 'react'
import { Header, Left, Body, Icon, Content } from 'native-base'
import SigninForm from '../components/Forms/SigninForm'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
export default function SigninPage({ navigation }) {
    return <>
        <Header style={{ backgroundColor: "#640e8a" }}>
            <Left>
                <Icon name='arrow-back' onPress={() => navigation.goBack()} style={{ color: 'white' }} />
            </Left>
            <Body />
        </Header>
        <Content>
            <View style={{ backgroundColor: "#640e8a" }}>
                <Image source={{ uri: "https://mybroadband.co.za/news/wp-content/uploads/2017/06/OLX-logo-purple.jpg" }}
                    style={{ flex: 1, height: 300, borderRadius: 20 }}
                />
            </View>
            <SigninForm navigation={navigation} />
        </Content>
    </>
}
