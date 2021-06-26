import React, { useState } from 'react'
import { Text, Form, Item, Input, Label, Button, Icon, Spinner } from 'native-base'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'
import AppSetting from '../../AppSetting'
export default function SigninForm(props) {
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyyioljla/image/upload";
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsApp] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [userImageUrl, setUserImageurl] = useState('')
    const [emailValidation, setEmailValidation] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState(false)
    const [nameValidation, setNameValidation] = useState(false)
    const [whatsappValidation, setWhatsappValidation] = useState(false)
    const [addressValidation, setAddressValidation] = useState(false)
    const [rePasswordValidation, setRePasswordValidation] = useState(false)
    const [fieldErr, setFieldErr] = useState(false)
    const selectOneImage = async () => {
        let options = {
            mediaType: "photo",
            includeBase64: true,
            maxHeight: 200,
            quality: 1,
            saveToPhotos: true,
        };
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                alert("Something went Wrong in Picking Image");
                return
            }
            else if (res.errorMessage) {
                alert("Error In picking Image", + res.errorMessage)
            }
            setUserImageurl(res.base64)
            setIsFileSelected(true)
        })
    }
    let regexForName = /^[A-Za-z .0-9]{3,}$/
    let regexForPassword = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,16}$/
    let regexForEmail = /^[A-Za-z_0-9]{3,}@[A-Za-z_0-9]{3,}[.][A-Za-z.]{2,}$/
    let regexUserPhoneNumber = /^[0-9]{11,}$/
    let regexHomeAddress = /^[0-9a-zA-Z,#-- ]{3,}$/
    const sendInformationToServer = () => {
        setGetResponseFromServer(true)
        if (!(name && email && password && rePassword && whatsapp && homeAddress && userImageUrl)) {
            setFieldErr(true);
            setEmailValidation(false)
            setPasswordValidation(false)
            setNameValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            setRePasswordValidation(false)
            return;
        } else if (password !== rePassword) {
            setFieldErr(false);
            setEmailValidation(false)
            setPasswordValidation(false)
            setNameValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            setRePasswordValidation(true)
            return;
        } else if (!(regexForName.test(name))) {
            setFieldErr(false);
            setEmailValidation(false)
            setPasswordValidation(false)
            setNameValidation(true)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            setRePasswordValidation(false)
            return;
        } else if (!(regexForEmail.test(email))) {
            setFieldErr(false);
            setEmailValidation(true)
            setPasswordValidation(false)
            setNameValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            setRePasswordValidation(false)
            return;
        } else if (!(regexForPassword.test(password))) {
            setFieldErr(false);
            setEmailValidation(false)
            setPasswordValidation(true)
            setNameValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            setRePasswordValidation(false)
            return;
        } else if (!(regexUserPhoneNumber.test(whatsapp))) {
            setFieldErr(false);
            setEmailValidation(false)
            setPasswordValidation(false)
            setNameValidation(false)
            setWhatsappValidation(true)
            setAddressValidation(false)
            setGetResponseFromServer(false);
            setRePasswordValidation(false)
            return;
        } else if (!(regexHomeAddress.test(homeAddress))) {
            setFieldErr(false);
            setEmailValidation(false)
            setPasswordValidation(false)
            setNameValidation(false)
            setWhatsappValidation(false)
            setAddressValidation(true)
            setRePasswordValidation(false)
            setGetResponseFromServer(false);
            return;
        }
        let base64Img = `data:image/jpg;base64,${userImageUrl}`;
        let data = {
            "file": base64Img,
            "upload_preset": "wcdlvs5y",
        }
        fetch(CLOUDINARY_URL, { body: JSON.stringify(data), headers: { 'content-type': 'application/json' }, method: 'POST', })
            .then(r => r.json())
            .then(cloundnaryUploadedImageUrl => {
                let userInfo = {
                    userInfo: { name, email, whatsapp, homeAddress, password, userImageUrl: cloundnaryUploadedImageUrl.url }
                }
                return axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/user/add-new`, userInfo)
                    .then(succ => {
                        if (succ.status) {
                            cleanFields()
                            setFieldErr(false);
                            setEmailValidation(false)
                            setPasswordValidation(false)
                            setNameValidation(false)
                            setWhatsappValidation(false)
                            setAddressValidation(false)
                            setRePasswordValidation(false)
                            props.navigation.navigate("Login")
                            return
                        }
                    })
            })
            .catch(err => {
                console.log("Error in uploading Image", err)
            }).finally(() => {
                setGetResponseFromServer(false)
                setIsFileSelected(false)
            })
    }
    const cleanFields = () => {
        setName('')
        setEmail('')
        setWhatsApp('')
        setHomeAddress('')
        setPassword('')
        setRePassword('')
        setUserImageurl('')
    }
    return <>
        <View style={{ backgroundColor: "#ebe6ed", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text style={{ fontSize: 40, fontWeight: 'bold', paddingVertical: 20, color: "#640e8a" }}> OLX | Pakistan </Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#640e8a" }}> Signin </Text>
            </View>
        </View>
        <View style={{ backgroundColor: "#ebe6ed" }}>
            <View style={{ flex: 1, marginHorizontal: 40, }}>
                {fieldErr ? <View>
                    <Text style={{ color: "red" }}> *All fields must be field </Text>
                </View> : <></>}
                <Form>
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#640e8a" }}>Your name </Label>
                        <Input value={name} onChangeText={text => setName(text)} />
                    </Item>
                    {nameValidation ? <View>
                        <Text style={{ color: "red" }}> *Enter your valid name </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#640e8a" }}>WhatsApp Number </Label>
                        <Input value={whatsapp} onChangeText={text => setWhatsApp(text)} />
                    </Item>
                    {whatsappValidation ? <View>
                        <Text style={{ color: "red" }}> *Enter your valid whatsApp Number </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#640e8a" }}>Email Address </Label>
                        <Input value={email} onChangeText={text => setEmail(text)} />
                    </Item>
                    {emailValidation ? <View>
                        <Text style={{ color: "red" }}> *Enter your valid Email Address </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#640e8a" }}>Home Address </Label>
                        <Input value={homeAddress} onChangeText={text => setHomeAddress(text)} />
                    </Item>
                    {addressValidation ? <View>
                        <Text style={{ color: "red" }}> *Enter your valid Home Address </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#640e8a" }}>  Password </Label>
                        <Input value={password} onChangeText={text => setPassword(text)} secureTextEntry />
                    </Item>
                    {passwordValidation ? <View>
                        <Text style={{ color: "red" }}> *Enter Valid password| Password contain 6 latter and one special chr </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#640e8a" }}>Repeat password </Label>
                        <Input value={rePassword} onChangeText={text => setRePassword(text)} secureTextEntry />
                    </Item>
                    {rePasswordValidation ? <View>
                        <Text style={{ color: "red" }}> *Something went wrong password does not match Try again </Text>
                    </View> : <></>}
                    {isFileSelected ?
                        <Button disabled style={{ backgroundColor: "#7f6f85", borderRadius: 100, marginVertical: 20, color: "#640e8a" }} full><Text> Image Selected </Text></Button> :
                        <Button style={{ backgroundColor: "#7f6f85", borderRadius: 100, marginVertical: 20, color: "#640e8a" }} full
                            onPress={() => selectOneImage()} >
                            <Text> Select Your Image</Text>
                        </Button>}

                    {getResponseFromServer ? <Spinner color='blue' /> : <Button style={{ backgroundColor: "#640e8a", borderRadius: 100, marginVertical: 20 }} full
                        onPress={sendInformationToServer}
                    >
                        <Text> Submit Information</Text>
                    </Button>}
                    <Button transparent full onPress={() => props.navigation.navigate("Login")}>
                        <Text> If you have an account lets Login</Text>
                    </Button>
                </Form>
                <Divider style={{ backgroundColor: "#640e8a" }} />
                <Button style={{ backgroundColor: "#640e8a", borderRadius: 100, marginVertical: 20 }} full>
                    <Icon name='logo-google' style={{ color: 'white', marginLeft: 80 }} />
                    <Text style={{ color: 'white', marginRight: 60 }}> Sign in with Google</Text>
                </Button>
            </View>
        </View>








    </>
};
