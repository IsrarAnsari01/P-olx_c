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
    const [nameValidation, setNameValidation] = useState(false)
    const [emailValidation, setEmailValidation] = useState(false)
    const [whatsappValidation, setWhatsappValidation] = useState(false)
    const [addressValidation, setAddressValidation] = useState(false)
    const [fieldErr, setFieldErr] = useState(false)
    let regexForName = /^[A-Za-z .0-9]{3,}$/
    let regexForEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
    let regexUserPhoneNumber = /^[0-9]{11,}$/
    let regexHomeAddress = /^[0-9a-zA-Z,#-- ]{3,}$/
    const updateUserInformation = () => {
        setGetResponseFromServer(true)
        if (!(name && email && whatsapp && homeAddress)) {
            setFieldErr(true);
            setEmailValidation(false)
            setNameValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexForName.test(name))) {
            setFieldErr(false);
            setNameValidation(true)
            setEmailValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexForEmail.test(email))) {
            setFieldErr(false);
            setNameValidation(false)
            setEmailValidation(true)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexUserPhoneNumber.test(whatsapp))) {
            setFieldErr(false);
            setNameValidation(false)
            setEmailValidation(false)
            setWhatsappValidation(true)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexHomeAddress.test(homeAddress))) {
            setFieldErr(false);
            setNameValidation(false)
            setEmailValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(true)
            setGetResponseFromServer(false);
            return;
        }
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
                            setFieldErr(false);
                            setNameValidation(false)
                            setEmailValidation(false)
                            setWhatsappValidation(false)
                            setAddressValidation(false)
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
                    {fieldErr ? <View>
                        <Text style={{ color: "red" }}> *All fields must be field </Text>
                    </View> : <></>}
                    <Form>
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>Your name </Label>
                            <Input value={name} onChangeText={text => setName(text)} />
                        </Item>
                        {nameValidation ? <View>
                            <Text style={{ color: "red" }}> *Invalid Name Please enter a valid name  </Text>
                        </View> : <></>}
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>WhatsApp Number </Label>
                            <Input value={whatsapp} onChangeText={text => setWhatsapp(text)} />
                        </Item>
                        {whatsappValidation ? <View>
                            <Text style={{ color: "red" }}> *Invalid Number Please enter a valid Number  </Text>
                        </View> : <></>}
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>Email Address </Label>
                            <Input value={email} onChangeText={text => setEmail(text)} />
                        </Item>
                        {emailValidation ? <View>
                            <Text style={{ color: "red" }}> *Invalid Email Please enter a valid Email  </Text>
                        </View> : <></>}
                        <Item floatingLabel style={{ paddingVertical: 10 }}>
                            <Label style={{ color: "#3e4a43" }}>Home Address </Label>
                            <Input value={homeAddress} onChangeText={text => setHomeAddress(text)} />
                        </Item>
                        {addressValidation ? <View>
                            <Text style={{ color: "red" }}> *Invalid Home Address Please enter a valid Home Address  </Text>
                        </View> : <></>}
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
