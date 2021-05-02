import React, { useState } from 'react'
import { Text, Form, Item, Button, Label, Input, Spinner } from 'native-base'
import { View } from 'react-native'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import AppSetting from '../../AppSetting'
export default function LoginForm(props) {
    const [email, setUserEmail] = useState('')
    const [password, setUserPassword] = useState('')
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const dispatch = useDispatch()
    const LoginUser = () => {
        setGetResponseFromServer(true)
        let data = { userInfo: { email, password } }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/login-user`, data)
            .then(userData => {
                if (userData.status) {
                    dispatch({
                        type: "Login",
                        payload: userData.data.user
                    })
                    props.navigation.navigate("Products")
                    cleanFields()
                }
            }).catch(err => {
                console.log("Error in finding user ", err)
                if (err.status === false) {
                    setGetResponseFromServer(false)
                    return
                }
            }).finally(() => setGetResponseFromServer(false))
    }
    function cleanFields() {
        setUserEmail('')
        setUserPassword('')
    }
    return <>
        <View style={{ marginTop: 20, backgroundColor: "#424f3f" }}>
            <View style={{ backgroundColor: "#b0b8ae", flex: 1, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 100 }}>
                <View>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', paddingVertical: 20, color: '#1e3326' }}> OLX | Pakistan </Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#1e3326' }}> Login Now </Text>
                </View>
            </View>
            <View style={{ backgroundColor: "#b0b8ae", borderBottomLeftRadius: 80, }}>
                <View style={{ flex: 1, marginHorizontal: 40 }}>
                    <Form>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ fontSize: 20, color: '#3d473b' }}> Email </Label>
                            <Input value={email} onChangeText={text => setUserEmail(text)} />
                        </Item>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ fontSize: 20, color: '#3d473b' }}>Password </Label>
                            <Input type='password' value={password} onChangeText={text => setUserPassword(text)} />
                        </Item>
                        {getResponseFromServer ? <Spinner color='red' /> :
                            <Button style={{ backgroundColor: "#1e3326", borderRadius: 100, marginVertical: 20 }} full onPress={LoginUser}>
                                <Text> Login </Text>
                            </Button>}
                    </Form>
                </View>
            </View>
        </View>



    </>
}
