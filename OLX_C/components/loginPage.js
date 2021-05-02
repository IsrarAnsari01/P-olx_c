import React, { useEffect } from 'react'
import { Container, Header, Icon, Content, Left, Body } from 'native-base'
import { Image } from 'react-native-elements'
import { View } from 'react-native'
import LoginForm from './Forms/LoginForm'
export default function loginPage({ navigation }) {
    return <>
        <Container>
            <Header style={{ backgroundColor: "#1e3326" }}>
                <Left>
                    <Icon name='arrow-back' style={{ color: 'white' }} onPress={() => navigation.navigate("Home")} />
                </Left>
                <Body />
            </Header>
            <Content>
                <Image source={{ uri: 'https://www.romaniajournal.ro/wp-content/uploads/2020/04/OLX_Rebranding.png' }}
                    style={{ height: 300, flex: 1, borderTopRightRadius: 150, borderBottomLeftRadius: 150 }} />
                <View style={{ backgroundColor: "#424f3f" }}>
                    <LoginForm navigation={navigation} />
                </View>
            </Content>
        </Container>
    </>
}
