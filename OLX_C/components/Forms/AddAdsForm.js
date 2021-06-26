import React, { useState } from 'react'
import { Text, Form, Item, Label, Input, Picker, Textarea, Icon, Button, ListItem, Body, CheckBox, Spinner } from 'native-base'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'
import AppSetting from '../../AppSetting'
export default function AddAdsForm() {
    const productCetagory = ["Vehicals", "Mobile", "Computers", "Men Clothes", "Toys", "Cosmetics", "Watches"]
    const productSubCetagory = [
        { pCetaogy: "Vehicals", company: "Kia", id: "01", isSelected: false },
        { pCetaogy: "Vehicals", company: "Suzuki", id: "02", isSelected: false },
        { pCetaogy: "Vehicals", company: "Honda", id: "03", isSelected: false },
        { pCetaogy: "Vehicals", company: "Toyota", id: "04", isSelected: false },
        { pCetaogy: "Vehicals", company: "MG", id: "05", isSelected: false },
        { pCetaogy: "Vehicals", company: "BMW", id: "06", isSelected: false },
        { pCetaogy: "Mobile", company: "Sumsung", id: "07 ", isSelected: false },
        { pCetaogy: "Mobile", company: "Apple", id: "08", isSelected: false },
        { pCetaogy: "Mobile", company: "Xiomi", id: "09", isSelected: false },
        { pCetaogy: "Mobile", company: "Motorola", id: "10", isSelected: false },
        { pCetaogy: "Mobile", company: "Infinux", id: "11", isSelected: false },
        { pCetaogy: "Mobile", company: "Tecno", id: "12", isSelected: false },
        { pCetaogy: "Computers", company: "Dell", id: "13", isSelected: false },
        { pCetaogy: "Computers", company: "Fujistu", id: "14", isSelected: false },
        { pCetaogy: "Computers", company: "HP", id: "15", isSelected: false },
        { pCetaogy: "Computers", company: "Leveno", id: "16", isSelected: false },
        { pCetaogy: "Men Clothes", company: "MTJ", id: "17", isSelected: false },
        { pCetaogy: "Men Clothes", company: "J.", id: !"8", isSelected: false },
        { pCetaogy: "Toys", company: "Car", id: "19", isSelected: false },
        { pCetaogy: "Toys", company: "Gun", id: "20", isSelected: false },
        { pCetaogy: "Cosmetics", company: "Loriyal", id: "21", isSelected: false },
        { pCetaogy: "Cosmetics", company: "Xyz", id: "22", isSelected: false },
        { pCetaogy: "Men Clothes", company: "Own Brand", id: "23", isSelected: false },
        { pCetaogy: "Watches", company: "Rolex", id: "24", isSelected: false },
        { pCetaogy: "Watches", company: "Hublot", id: 25, isSelected: false },
        { pCetaogy: "Watches", company: "Digital Watch", id: "26", isSelected: false },
        { pCetaogy: "Watches", company: "Apple", id: "27", isSelected: false },
        { pCetaogy: "Watches", company: "Sumsung", id: "28", isSelected: false },
        { pCetaogy: "Watches", company: "Xiomi band", id: "29", isSelected: false },
    ]
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyyioljla/image/upload";
    const loginUser = useSelector(state => state.auth)
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [cetagory, setCetagory] = useState(undefined)
    const [subcetagory, setSubCetagory] = useState(null)
    const [isChecked, setIsChecked] = useState(false)
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [number, setSellerNumber] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [details, setProductDetails] = useState('')
    const [coverImageUrl, setProductCoverImageUrl] = useState('')
    const [prdSubCategories, setPrdSubCategories] = useState(productSubCetagory)
    const [productNameValidation, setProductNameValidation] = useState(false)
    const [priceValidation, setPriceValidation] = useState(false)
    const [numberValidation, setNumberValidation] = useState(false)
    const [cetagoryValidation, setCetagoryValidation] = useState(false)
    const [subCetagoryValidation, setSubCetagoryValidation] = useState(false)
    const [addressValidation, setAddressValidation] = useState(false)
    const [detailsValidation, setDetailsValidation] = useState(false)
    const [fieldErr, setFieldErr] = useState(false)
    let SNO = 0;
    const selectOneImage = async () => {
        let options = {
            mediaType: "photo",
            includeBase64: true,
            // maxWidth: 460,
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
            setProductCoverImageUrl(res.base64)
            setIsFileSelected(true)
        })
    }

    const regexForName = /^[A-Za-z .0-9]{3,}$/
    const regexForPrice = /^[0-9]{1,}$/
    const regexForNumber = /^[0-9]{11,}$/
    const regexHomeAddress = /^[0-9a-zA-Z,#-- ]{3,}$/
    const regexProductDetails = /^[A-Za-z0-9,-=."" ]{2,}$/


    const saveNewAd = () => {
        setGetResponseFromServer(true)
        if (!(productName && price && number && cetagory && subcetagory && homeAddress && details && coverImageUrl)) {
            setFieldErr(true);
            setProductNameValidation(false)
            setPriceValidation(false)
            setNumberValidation(false)
            setCetagoryValidation(false)
            setAddressValidation(false)
            setDetailsValidation(false)
            setSubCetagoryValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexForName.test(productName))) {
            setFieldErr(false);
            setProductNameValidation(true)
            setPriceValidation(false)
            setNumberValidation(false)
            setCetagoryValidation(false)
            setAddressValidation(false)
            setDetailsValidation(false)
            setSubCetagoryValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexForPrice.test(price))) {
            setFieldErr(false);
            setProductNameValidation(false)
            setPriceValidation(true)
            setNumberValidation(false)
            setCetagoryValidation(false)
            setAddressValidation(false)
            setDetailsValidation(false)
            setSubCetagoryValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexForNumber.test(number))) {
            setFieldErr(false);
            setProductNameValidation(false)
            setPriceValidation(false)
            setNumberValidation(true)
            setCetagoryValidation(false)
            setAddressValidation(false)
            setDetailsValidation(false)
            setSubCetagoryValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(cetagory)) {
            setFieldErr(false);
            setProductNameValidation(false)
            setPriceValidation(false)
            setNumberValidation(false)
            setCetagoryValidation(true)
            setAddressValidation(false)
            setDetailsValidation(false)
            setSubCetagoryValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(subcetagory)) {
            setFieldErr(false);
            setProductNameValidation(false)
            setPriceValidation(false)
            setNumberValidation(false)
            setCetagoryValidation(false)
            setSubCetagoryValidation(true)
            setAddressValidation(false)
            setDetailsValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexHomeAddress.test(homeAddress))) {
            setFieldErr(false);
            setProductNameValidation(false)
            setPriceValidation(false)
            setNumberValidation(false)
            setCetagoryValidation(false)
            setSubCetagoryValidation(false)
            setAddressValidation(true)
            setDetailsValidation(false)
            setGetResponseFromServer(false);
            return;
        } else if (!(regexProductDetails.test(details))) {
            setFieldErr(false);
            setProductNameValidation(false)
            setPriceValidation(false)
            setNumberValidation(false)
            setCetagoryValidation(false)
            setSubCetagoryValidation(false)
            setAddressValidation(false)
            setDetailsValidation(true)
            setGetResponseFromServer(false);
            return;
        }
        let base64Img = `data:image/jpg;base64,${coverImageUrl}`;
        let data = {
            "file": base64Img,
            "upload_preset": "wcdlvs5y",
        }
        fetch(CLOUDINARY_URL, { body: JSON.stringify(data), headers: { 'content-type': 'application/json' }, method: 'POST', })
            .then(r => r.json())
            .then(cloundnaryUploadedImageUrl => {
                let datatoSend = {
                    adDetails: { productName, price, number, cetagory, subcetagory, homeAddress, details, coverImageUrl: cloundnaryUploadedImageUrl.url, userInfo: loginUser._id }
                }
                return axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/product/add-new`, datatoSend)
                    .then(ad => {
                        if (ad.status) {
                            cleanFields()
                            setFieldErr(false);
                            setProductNameValidation(false)
                            setPriceValidation(false)
                            setNumberValidation(false)
                            setCetagoryValidation(false)
                            setSubCetagoryValidation(false)
                            setAddressValidation(false)
                            setDetailsValidation(false)
                            alert("Ad added Successfuly")
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
        setCetagory(undefined)
        setSubCetagory(null)
        setIsChecked(false)
        setProductDetails('')
        setProductName('')
        setPrice('')
        setSellerNumber('')
        setHomeAddress('')
        setProductDetails('')
        setProductCoverImageUrl('')
    }

    const setPrdSelected = (prd) => {
        let modifiedCategoryIndex = prdSubCategories.findIndex(prdSubCategory => prdSubCategory.id === prd.id)
        prdSubCategories[modifiedCategoryIndex].isSelected = !prdSubCategories[modifiedCategoryIndex].isSelected
        setPrdSubCategories([...prdSubCategories])
    };

    return <>
        <View style={{ backgroundColor: "#f2faf5", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text style={{ fontSize: 40, fontWeight: 'bold', paddingVertical: 20, color: "#2bb33b" }}> OLX | Pakistan </Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#2bb33b" }}> Add New Ad </Text>
            </View>
        </View>
        <View style={{ backgroundColor: "#f2faf5" }}>
            <View style={{ flex: 1, marginHorizontal: 40, }}>
                {fieldErr ? <View>
                    <Text style={{ color: "red" }}> *All fields must be field </Text>
                </View> : <></>}
                <Form>
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#2bb33b" }}>Product Name </Label>
                        <Input value={productName} onChangeText={text => setProductName(text)} />
                    </Item>
                    {productNameValidation ? <View>
                        <Text style={{ color: "red" }}> *Invalid Product Name please enter a valid Product Name </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#2bb33b" }}>Product Price </Label>
                        <Input value={price} onChangeText={text => setPrice(text)} />
                    </Item>
                    {priceValidation ? <View>
                        <Text style={{ color: "red" }}> *Invalid Product Price please enter a valid Product price </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#2bb33b" }}> Your WhatsApp Number</Label>
                        <Input value={number} onChangeText={text => setSellerNumber(text)} />
                    </Item>
                    {numberValidation ? <View>
                        <Text style={{ color: "red" }}> *Invalid whatsApp Number please enter a valid whatsApp Number </Text>
                    </View> : <></>}
                    <Item floatingLabel style={{ paddingVertical: 10 }}>
                        <Label style={{ color: "#2bb33b" }}>Address </Label>
                        <Input value={homeAddress} onChangeText={text => setHomeAddress(text)} />
                    </Item>
                    {addressValidation ? <View>
                        <Text style={{ color: "red" }}> *Invalid Address please enter a valid Address </Text>
                    </View> : <></>}
                    <Item picker style={{ paddingVertical: 10 }}>
                        <Picker
                            mode="dropdown"
                            placeholder="Select Cetagory"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Select any one"
                            textStyle={{ color: "white" }}
                            itemStyle={{
                                backgroundColor: "white",
                                marginLeft: 0,
                                paddingLeft: 10
                            }}
                            itemTextStyle={{ color: "white" }}
                            style={{ width: 100 }}
                            selectedValue={cetagory}
                            onValueChange={val => setCetagory(val)}
                        >
                            <Picker.Item label="Select Cetagory" value="#" />
                            {productCetagory.map(c => <Picker.Item label={c} value={c} key={++SNO} />)}
                        </Picker>
                    </Item>
                    {cetagoryValidation ? <View>
                        <Text style={{ color: "red" }}> *Something went wrong in picking cetagory </Text>
                    </View> : <></>}
                    <View>
                        {cetagory && prdSubCategories.filter(c => c.pCetaogy === cetagory).map(c =>
                            <ListItem key={c.id}>
                                <CheckBox
                                    value={c.company}
                                    onPress={() => {
                                        setPrdSelected(c)
                                        setSubCetagory(c.company)
                                    }}
                                    checked={c.isSelected}
                                />
                                <Body>
                                    <Text> {c.company}</Text>
                                </Body>
                            </ListItem>)}
                    </View>
                    {subCetagoryValidation ? <View>
                        <Text style={{ color: "red" }}> *Something went wrong in picking sub cetagory </Text>
                    </View> : <></>}
                    <Textarea rowSpan={5} bordered placeholder="Enter Product Details Here" value={details} onChangeText={text => setProductDetails(text)} />
                    {detailsValidation ? <View>
                        <Text style={{ color: "red" }}> *Invalid Product Details Enter a valid Details </Text>
                    </View> : <></>}
                    {isFileSelected ?
                        <Button disabled style={{ backgroundColor: "#7f6f85", borderRadius: 100, marginVertical: 20, color: "#640e8a" }} full><Text> Image Selected </Text></Button> :
                        <Button primary style={{ borderRadius: 100, marginVertical: 20, color: "#640e8a" }} full
                            onPress={() => selectOneImage()} >
                            <Text> Select Your Image</Text>
                        </Button>}
                    {getResponseFromServer ? <Spinner color='blue' /> :
                        <Button success style={{ borderRadius: 100, marginTop: 20 }} full onPress={() => saveNewAd()}>
                            <Text> Submit Ad Details</Text>
                        </Button>}
                </Form>
            </View>
        </View>

    </>
}
