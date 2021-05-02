import React, { useState, useEffect } from 'react';
import { List, ListItem, Text, Left, Body, Button, Icon, Item, Form, Picker, Card, CardItem, Spinner } from 'native-base';
import { useSelector } from 'react-redux'
import { Image, View } from 'react-native'
import axios from 'axios';
import AppSetting from '../../AppSetting';
import { Col, Grid, Row } from "react-native-easy-grid"
import { FlatList } from 'react-native'
export default function AllProducts(props) {
    const userInfo = useSelector(state => state.auth)
    const [getAllProducts, setGetAllProducts] = useState([])
    let SNO = 0;
    const productCetagory = ["Vehicals", "Mobile", "Computers", "Men Clothes", "Toys", "Cosmetics", "Watches"]
    const productSubCetagory = [
        { pCetaogy: "Vehicals", company: "Kia", id: "01" },
        { pCetaogy: "Vehicals", company: "Suzuki", id: "02" },
        { pCetaogy: "Vehicals", company: "Honda", id: "03" },
        { pCetaogy: "Vehicals", company: "Toyota", id: "04" },
        { pCetaogy: "Vehicals", company: "MG", id: "05" },
        { pCetaogy: "Vehicals", company: "BMW", id: "06" },
        { pCetaogy: "Mobile", company: "Sumsung", id: "07 " },
        { pCetaogy: "Mobile", company: "Apple", id: "08" },
        { pCetaogy: "Mobile", company: "Xiomi", id: "09" },
        { pCetaogy: "Mobile", company: "Motorola", id: "10" },
        { pCetaogy: "Mobile", company: "Infinux", id: "11" },
        { pCetaogy: "Mobile", company: "Tecno", id: "12" },
        { pCetaogy: "Computers", company: "Dell", id: "13" },
        { pCetaogy: "Computers", company: "Fujistu", id: "14" },
        { pCetaogy: "Computers", company: "HP", id: "15" },
        { pCetaogy: "Computers", company: "Leveno", id: "16" },
        { pCetaogy: "Men Clothes", company: "MTJ", id: "17" },
        { pCetaogy: "Men Clothes", company: "J.", id: !"8" },
        { pCetaogy: "Toys", company: "Car", id: "19" },
        { pCetaogy: "Toys", company: "Gun", id: "20" },
        { pCetaogy: "Cosmetics", company: "Loriyal", id: "21" },
        { pCetaogy: "Cosmetics", company: "Xyz", id: "22" },
        { pCetaogy: "Men Clothes", company: "Own Brand", id: "23" },
        { pCetaogy: "Watches", company: "Rolex", id: "24" },
        { pCetaogy: "Watches", company: "Hublot", id: 25 },
        { pCetaogy: "Watches", company: "Digital Watch", id: "26" },
        { pCetaogy: "Watches", company: "Apple", id: "27" },
        { pCetaogy: "Watches", company: "Sumsung", id: "28" },
        { pCetaogy: "Watches", company: "Xiomi band", id: "29" },
    ]
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [cetagory, setCetagory] = useState(undefined)
    const [subCetagory, setSubCetagory] = useState(undefined)
    const [isSelected, setIsSelected] = useState(false)
    const [isSelectedForNested, setIsSelectedForNested] = useState(false)
    const [filterArray, setFilterArray] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getProductsFromDb()
        setIsSelectedForNested(false)
    }, [])
    const getProductsFromDb = () => {
        axios.get(`${AppSetting.Back_END_HOSTED_SERVER}/product`)
            .then(succ => {
                setGetAllProducts(succ.data.products.reverse());
                console.log("got data =>", succ.data.products.length);
                // This is for pagination
                // filterProducts(page, succ.data.products.reverse());
            }).catch(err => {
                console.log("Error in Fetching Products", err)
            })
    }
    // For Pagination
    // const filterProducts = (page, localData) => {
    //     let allData = getAllProducts;
    //     if (localData) {
    //         allData = localData;
    //     }
    //     const LIMIT = 5;
    //     const totalItems = LIMIT * page;
    //     const filteredProducts = allData.slice(0, totalItems);
    //     setFilteredProducts(filteredProducts)
    // };
    const filterChildArray = () => {
        setGetResponseFromServer(true)
        let data = { cetagory: cetagory }
        axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/product/findSpecficCetagoryAd`, data)
            .then(succ => {
                if (succ.status) {
                    setGetAllProducts(succ.data.Ads)
                    setIsSelected(true)
                    setCetagory(undefined)
                    return
                }
            }).catch(err => {
                console.log("Error in filtering Array ", err)
            }).finally(() => setGetResponseFromServer(false))
    }
    const nestedArray = (value) => {
        setIsSelectedForNested(true)
        let dummyArray = []
        productSubCetagory.forEach(c => {
            if (c.pCetaogy === value) {
                dummyArray.push(c)
            }
        })
        setFilterArray(dummyArray)
    }
    const reSetFilterArray = () => {
        getProductsFromDb()
        setIsSelected(false)
        setIsSelectedForNested(false)
    }
    const filterWithNestedArray = () => {
        // setGetResponseFromServer(true)
        if (cetagory && subCetagory) {
            let data = {
                details: {
                    cetagory: cetagory, subCetagory: subCetagory
                }
            }
            // console.log(data)
            axios.post(`${AppSetting.Back_END_HOSTED_SERVER}/product/findSortedProduct`, data)
                .then(succ => {
                    if (succ.status) {
                        setGetAllProducts(succ.data.sortedArray)
                        setIsSelectedForNested(false)
                        setFilterArray(null)
                        setCetagory(undefined)
                        setSubCetagory(undefined)
                        setIsSelected(true)
                    }
                }).catch(err => {
                    console.log("Unable to find sorted Products ", err)
                }).finally(() => setGetResponseFromServer(false))
        }
    }

    const displayAds = ({ item }) => {
        return <List key={item._id}>
            <ListItem>
                <Left>
                    <Image source={{ uri: `${item.coverImageUrl}` }} style={{ height: 150, flex: 1 }} />
                </Left>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Body style={{ position: 'relative' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', paddingVertical: 10 }}> {item.productName.length > 15 ? item.productName.substr(0, 10) + "...." : item.productName} </Text>
                        <Text>Price | {item.price}</Text>
                        <Text>Location | {item.homeAddress} </Text>
                        <Button success full style={{ borderRadius: 20, padding: 10, margin: 10 }}
                            onPress={() => userInfo ? props.navigation.navigate("SingleProduct", { productId: item._id }) : props.navigation.navigate("Login")}>
                            <Text>Buy Now</Text>
                        </Button>
                    </Body>
                </View>
            </ListItem>
        </List>
    }
    // For Pagination
    // const loadMoreData = () => {
    //     console.log("Getting more data");
    //     if (filteredProducts.length === getAllProducts.length) {
    //         return;
    //     }
    //     const newPage = page + 1;
    //     filterProducts(newPage)
    // }


    return <>
        <View style={{ height: 150, flex: 1, backgroundColor: "#f5fafa", marginHorizontal: 10 }}>
            <Grid>
                <Row>
                    <Col size={65}>
                        <Form>
                            <Item picker style={{ backgroundColor: "#f5f5f5", color: 'black', borderRadius: 300 }}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" style={{ color: 'black' }} />}
                                    style={{ width: undefined }}
                                    placeholder="Select your Type"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={cetagory}
                                    onValueChange={(val) => {
                                        setCetagory(val)
                                        nestedArray(val)
                                    }}
                                >
                                    <Picker.Item label="Search by Cetagory" value="null" />
                                    {productCetagory.map(op => <Picker.Item label={op} value={op} key={++SNO} />)}
                                </Picker>
                            </Item>
                        </Form>
                    </Col>
                    <Col size={35}>
                        <View >
                            {getResponseFromServer ? <Spinner color='red' /> :
                                <>
                                    {isSelectedForNested ? <></> : <Button info full style={{ paddingHorizontal: 10, borderRadius: 300, marginVertical: 10 }}
                                        onPress={() => {
                                            filterChildArray()
                                        }}>
                                        <Text> Search now </Text>
                                    </Button>}
                                </>
                            }
                        </View>
                    </Col>
                </Row>
                {isSelectedForNested ? <Row>
                    <Col size={65}>
                        <View style={{ marginVertical: 60 }}>
                            <Form>
                                <Item picker style={{ backgroundColor: "#f5f5f5", color: 'black', borderRadius: 300, paddingVertical: 20 }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" style={{ color: 'black' }} />}
                                        style={{ width: undefined }}
                                        placeholder="Select your Type"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={subCetagory}
                                        onValueChange={(val) => { setSubCetagory(val) }}
                                    >
                                        <Picker.Item label="Search by sub Cetagory" value="null" />
                                        {filterArray && filterArray.length > 0 ? filterArray.map(op => <Picker.Item label={op.company} value={op.company} key={++SNO} />)
                                            : <Picker.Item label="No Child Cetagory Selected" value="null" />}
                                    </Picker>
                                </Item>
                            </Form>
                        </View>
                    </Col>
                    <Col size={35}>
                        <View style={{ marginVertical: 20 }}>
                            {getResponseFromServer == true ? <Spinner color='red' /> :
                                <Button primary full style={{ paddingHorizontal: 10, borderRadius: 300, marginVertical: 10 }}
                                    onPress={() => {
                                        filterWithNestedArray()
                                    }}>
                                    <Text> Search </Text>
                                </Button>}
                        </View>
                    </Col>
                </Row> : <></>}
                <View style={{ marginVertical: 60 }}></View>
                <Row>
                    <Col>
                        {isSelected ? <View style={{ backgroundColor: "#f5fafa" }}>
                            <Button danger block rounded style={{ padding: 30, }}
                                onPress={() => {
                                    reSetFilterArray()
                                }}>
                                <Icon name='reload' />
                                <Text> Reset </Text>
                            </Button>

                        </View>

                            : <View style={{ backgroundColor: "#f5fafa" }}>
                                <Button primary block rounded style={{ padding: 30, }}
                                    onPress={() => {
                                        props.navigation.navigate("AddAds")
                                    }}>
                                    <Icon name='share-sharp' />
                                    <Text>Add new Product</Text>
                                </Button>

                            </View>

                        }
                    </Col>
                </Row>
            </Grid>
        </View>
        {
            getAllProducts && getAllProducts.length == 0 ? <View style={{ flex: 1, alignItems: 'center', marginVertical: 100 }}>
                <Card style={{ backgroundColor: "#f5fafa" }}>
                    <CardItem header style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 20 }}> Team OLX | IA </Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={{ textAlign: 'center' }}>
                            Your Request failed for some reason reset then you see products again
                        </Text>
                    </CardItem>
                    <CardItem footer>
                        <Text> Message by Store Owner</Text>
                    </CardItem>
                </Card>
            </View>
                : <View style={{ marginVertical: 55, backgroundColor: "#f5fafa" }}>
                    {!!getAllProducts.length && <FlatList
                        data={getAllProducts}
                        renderItem={displayAds}
                        keyExtractor={item => item._id.toString()}
                    // Below things use fro pagination
                    // onEndReached={() => loadMoreData()}
                    // onEndReachedThreshold={0.8}
                    />}
                </View>
        }
    </>


}

