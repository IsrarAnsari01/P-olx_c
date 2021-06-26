import React, { useState } from 'react'
import { Text, Form, Item, Button, Label, Input, Spinner, Icon } from 'native-base'
import { View } from 'react-native'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import AppSetting from '../../AppSetting'
export default function LoginForm(props) {
    const [email, setUserEmail] = useState('')
    const [password, setUserPassword] = useState('')
    const [fieldErr, setFieldErr] = useState(false)
    const [emailValidation, setEmailValidation] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState(false)
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const dispatch = useDispatch()
    let regexForPassword = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/
    let regexForEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
    const LoginUser = () => {
        setGetResponseFromServer(true)
        if (!(email && password)) {
            console.log("all field must be field")
            setFieldErr(true);
            setEmailValidation(false);
            setPasswordValidation(false)
            setGetResponseFromServer(false)
            return;
        } else if (!(regexForEmail.test(email))) {
            console.log("Invalid Email")
            setEmailValidation(true);
            setFieldErr(false);
            setPasswordValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexForPassword.test(password))) {
            console.log("Invalid Password")
            setEmailValidation(false);
            setFieldErr(false);
            setPasswordValidation(true)
            setGetResponseFromServer(false);
            return;
        }
        let data = { userInfo: { email, password } }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/login-user`, data)
            .then(userData => {
                if (userData.status) {
                    dispatch({
                        type: "Login",
                        payload: userData.data.user
                    })
                    props.navigation.navigate("Products")
                    setEmailValidation(false);
                    setPasswordValidation(false);
                    setFieldErr(false);
                    cleanFields()
                    return;
                }
            }).catch(err => {
                console.log(err)
                alert("Unable to found your account try again Later")
                setGetResponseFromServer(false)
                return
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
                <View style={{ flex: 1, marginHorizontal: 15 }}>
                    {fieldErr ? <View>
                        <Text style={{ color: "red" }}> *All fields must be field </Text>
                    </View> : <></>}
                    <Form>
                        <Item floatingLabel style={{ paddingVertical: 5 }}>
                            <Icon active name='person' style={{ paddingVertical: 5 }} />
                            <Label style={{ fontSize: 20, color: '#3d473b' }}> Email </Label>
                            <Input value={email} onChangeText={text => setUserEmail(text)} />
                        </Item>
                        {emailValidation ? <View>
                            <Text style={{ color: "red" }}> *Invalid Email address </Text>
                        </View> : <></>}
                        <Item floatingLabel style={{ paddingVertical: 5 }}>
                            <Icon active name='eye-off' style={{ paddingVertical: 10 }} />
                            <Label style={{ fontSize: 20, color: '#3d473b' }}>Password </Label>
                            <Input type='password' value={password} onChangeText={text => setUserPassword(text)} secureTextEntry />
                        </Item>
                        {passwordValidation ? <View>
                            <Text style={{ color: "red" }}> *Invalid Password || Password contain atleast 6 alphabet and one special Chr </Text>
                        </View> : <></>}
                        {getResponseFromServer ? <Spinner color='red' /> :
                            <Button style={{ backgroundColor: "#1e3326", borderRadius: 100, marginVertical: 20 }} full onPress={LoginUser}>
                                <Text> Login </Text>
                            </Button>}
                    </Form>
                </View>
            </View>
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 5 }}> If you dont't have any account then join with us  </Text>
            <Button style={{ backgroundColor: "#1e3326", borderRadius: 100, marginVertical: 20 }} full onPress={() => props.navigation.navigate("Sigin")}>
                <Text> Sign in </Text>
            </Button>
        </View>



    </>
}
