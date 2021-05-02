import React, { useState } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios'
import AppSetting from '../../AppSetting'
import { Form, Item, Label, Button, Spinner, Input } from 'native-base'
import { useDispatch } from 'react-redux'
export default function UpdateUserInfoForm(props) {
    const dispatch = useDispatch()
    const userId = props.userInformation._id
    const [name, setName] = useState(props.userInformation.name)
    const [email, setEmail] = useState(props.userInformation.email)
    const [whatsapp, setWhatsapp] = useState(props.userInformation.whatsapp)
    const [homeAddress, setHomeAddress] = useState(props.userInformation.homeAddress)
    const [userImageUrl, setUserImageUrl] = useState(props.userInformation.userImageUrl)
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const updateUserInformation = () => {
        setGetResponseFromServer(true)
        const data = { name, email, whatsapp, homeAddress, userImageUrl, password: props.userInformation.password }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/update/${userId}`, data)
            .then(succ => {
                if (succ.status) {
                    axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/user/${userId}`)
                        .then(success => {
                            dispatch({
                                type: "Login",
                                payload: success.data.succ
                            })
                            console.log("Updated Successfully", succ.data.updatedStudent)
                            props.navigation.navigate("Profile")
                        })
                }
            }).catch(err => {
                console.log("Error In updating data ", err)

            }).finally(() => setGetResponseFromServer(false))
    }


    return <>
        <View style={{ backgroundColor: "#3e4a43", marginVertical: 20 }}>
            <View style={{ backgroundColor: "#d2d9d5", flex: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 100 }}>
                <View>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', paddingVertical: 20, color: "#2e4236" }}> OLX | Pakistan </Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#2e4236" }}> Make Updates </Text>
                </View>
            </View>
            <View style={{ backgroundColor: "#d2d9d5", borderBottomEndRadius: 100, height: 600 }}>
                <View style={{ flex: 1, marginHorizontal: 40, }}>
                    <Form>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>Your name </Label>
                            <Input value={name} onChangeText={text => setName(text)} />
                        </Item>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>WhatsApp Number </Label>
                            <Input value={whatsapp} onChangeText={text => setWhatsapp(text)} />
                        </Item>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>Email Address </Label>
                            <Input value={email} onChangeText={text => setEmail(text)} />
                        </Item>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>Home Address </Label>
                            <Input value={homeAddress} onChangeText={text => setHomeAddress(text)} />
                        </Item>
                        {getResponseFromServer ? <Spinner color='blue' /> :
                            <Button style={{ backgroundColor: "#3e4a43", borderRadius: 100, marginVertical: 20 }} full onPress={updateUserInformation}>
                                <Text style={{ color: "white" }}> Submit Updates</Text>
                            </Button>}
                    </Form>
                </View>
            </View>
        </View>







    </>
}
