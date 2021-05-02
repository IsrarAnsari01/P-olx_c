import React, { useState, useEffect, useCallback } from 'react'
import { Container, Header, Content, Left, Body, Icon } from 'native-base'
import { View } from 'react-native'
import { Image } from 'react-native-elements'
import { useSelector } from 'react-redux'
import socket from '../components/socketConnection'
import { Grid, Row } from "react-native-easy-grid"
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'
import axios from 'axios'
import AppSetting from '../AppSetting'
export default function ChatScreen({ route, navigation }) {
    const loginUser = useSelector(state => state.auth)
    const { productId, productImage } = route.params
    const [messages, setMessages] = useState([]);
    const [flag, setFlag] = useState(null);
    const getAllMessagesFromDB = () => {
        setMessages([])
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/chat/getAllMessage/${productId}`)
            .then(succ => {
                succ.data.messages.map(msg => {
                    let appendObj = {
                        _id: msg.rn_chat_gift_id,
                        text: msg.text,
                        createdAt: msg.createdAt,
                        user: msg.user
                    }
                    setMessages(previousMessages => GiftedChat.append(previousMessages, appendObj))
                })
            }).catch(err => {
                console.log("Error in fetching this product chat", err)
            })

    }
    useEffect(() => {
        getAllMessagesFromDB()
        socket.connect()
        socket.on("GET_CURRENT_MSG_OF_THIS_PRODUCT", currentMsg => {
            let appendObj = {
                _id: currentMsg.rn_chat_gift_id,
                text: currentMsg.text,
                createdAt: currentMsg.createdAt,
                user: currentMsg.user
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, appendObj))
        })
        console.log("Inside Parent UseEffect")
    }, [productId])
    const renderSend = (props) => {
        return <Send {...props}>
            <Icon name='arrow-forward-circle-sharp' style={{ color: "black", fontSize: 40, marginRight: 20 }} />
        </Send>
    }
    const scrollToBottomComponent = (props) => {
        return <Icon name="chevron-down-outline" style={{ color: "black", fontSize: 30 }} />
    }
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            textStyle={{
                right: {
                    fontSize: 18
                },
                left: {
                    fontSize: 18
                }
            }}

        />
    }
    const onSend = useCallback((message = []) => {
        const {
            _id,
            createdAt,
            text,
            user
        } = message[0]
        const dataSet = { productId, text, user, rn_chat_gift_id: _id, createdAt }
        socket.emit("GET_MSG_DETAILS_FROM_CLIENT", dataSet)
        setFlag(!flag)
    }, [])
    const renderInputToolbar = (props) => {
        return <InputToolbar {...props}
            containerStyle={{
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#bac8de",
            }}
        />
    }
    return <>
        <Container>
            <Header style={{ backgroundColor: "#f5fafa" }}>
                <Left>
                    <Icon name='arrow-back' onPress={() => navigation.goBack()} />
                </Left>
                <Body />
            </Header>
            <Grid>
                <Row size={30}>
                    <Content>
                        <View style={{ backgroundColor: "#f5fafa" }}>
                            <Image source={{ uri: `${productImage}` }}
                                style={{ height: 300, flex: 1, borderTopRightRadius: 100, borderBottomLeftRadius: 100 }} />
                        </View>
                    </Content>
                </Row>
                <Row size={60}>
                    <GiftedChat
                        messages={messages}
                        onSend={message => onSend(message)}
                        user={{
                            _id: loginUser._id,
                            name: loginUser.name,
                            avatar: loginUser.userImageUrl
                        }}
                        alwaysShowSend
                        renderSend={renderSend}
                        scrollToBottom
                        scrollToBottomComponent={scrollToBottomComponent}
                        renderBubble={renderBubble}
                        renderUsernameOnMessage={true}
                        renderInputToolbar={renderInputToolbar}
                    />
                </Row>
            </Grid>
        </Container>
    </>
}
