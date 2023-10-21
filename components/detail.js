import { Text, View,Image } from "react-native";
import FastImage from "react-native-fast-image";
import {StyleSheet, Dimensions} from 'react-native'

export default Detail = ({route, navigation})=>{
    let {imagePath} = route.params;
    console.log("imagePath",imagePath)
    return (
        <View>
            <FastImage style={styles.image} source={{uri:imagePath,cache: FastImage.cacheControl.immutable}} resizeMode="contain"/>
        </View>
    );
};

let styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        padding:5
    },
    image:{
        width:'100%',
        height:'100%'
    }
});