import { useEffect,useState,useReducer  } from "react";
import { Text, View ,FlatList,TouchableOpacity,RefreshControl,StatusBar,ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotosList } from "../thunk/fetchPhotosListThunk";
import {StyleSheet, Dimensions} from 'react-native'
import {Button, Card} from 'react-native-paper'; 
import FastImage from "react-native-fast-image";
import { PhotoRealmContext } from "../db";
import NetInfo from '@react-native-community/netinfo';
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


export default Home = ({navigation})=>{

    const {useRealm,useQuery} = PhotoRealmContext

    const dispatch = useDispatch()

    const realm = useRealm();

    let {photos,loading,error} = useSelector((state) => state.photosList)

    let photoDbList = [];

    let [photosList,setPhotosList] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const imageStatusReducer = (state, action) => {
        switch (action.type) {
          case 'LOADING':
            return { ...state, [action.id] : {loading:true,error:false} };
          case 'LOADED':
            return { ...state, [action.id] : {loading:false,error:false} };
          case 'ERROR':
            return { ...state, [action.id] : {loading:false,error:true} };
          default:
            return state;
        }
      };

      const initialState = {};

      const [imgState, imgDispatch] = useReducer(imageStatusReducer, initialState);


    const handleLoadStart = (id) => {
        console.log("loading start")
      imgDispatch({id:id,type:'LOADING'})
    };
  
    const handleLoadEnd = (id) => {
        console.log("loading stop")
      imgDispatch({id:id,type:'LOADED'})

    };

    const handleImageError = (id) => {
        imgDispatch({id:id,type:'ERROR'})
      };

    const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    if(isConnected){
        dispatch(fetchPhotosList());
    }else{
        photoDbList = realm.objects("Photo")
        console.log("photoDbList screen",photoDbList)
        setPhotosList(photoDbList);
    }

    return () => {
      unsubscribe();
    };
  }, []);

    useEffect(()=>{
        //console.log("photoState",photos)
        if(photos != undefined && photos.length>0){
            let photosFiltered = photos;
            photoDbList = realm.objects("Photo")
            if(photoDbList!= undefined && photoDbList.length>0){

                photosFiltered = photos.filter((itemA) => !photoDbList.some((itemB) => itemB.id == itemA.id));

            }
            if(photosFiltered.length>0){
                realm.write(() => {
                    photosFiltered.forEach(obj => {
                        realm.create('Photo',{
                        id: parseInt(obj.id),
                        farm: obj.farm.toString(),
                        secret:obj.secret,
                        title:obj.title,
                        server:obj.server
                        });
                    });
                });
            }
            setRefreshing(false);
            setPhotosList(photos);
        }
    },[photos]);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate data loading
        dispatch(fetchPhotosList());
      };


    let imageRender = ({item})=>{
        let imageStr = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`

        const {loading,error} = imgState[item.id] != undefined ? imgState[item.id] :{loading:false,error:false};
        return <Card style={styles.container} onPress={()=>{navigation.navigate("Detail",{imagePath:imageStr})}}>

                    <View style={styles.imageContainer}>
                    {loading && <ActivityIndicator size={40} style={styles.loader} />}

                    {!error ? (
                        <FastImage style={styles.image} 
                            source={{uri:imageStr,cache: FastImage.cacheControl.immutable}} 
                            resizeMode="cover" 
                            onError={() => handleImageError(item.id)}
                            onLoadStart={() => handleLoadStart(item.id)}
                            onLoadEnd={() => handleLoadEnd(item.id)} />
                    ) : (
                    <Text style={styles.errorText}>Error loading image</Text>
                    )}
                    </View>
                    <Text style={styles.text}>{item.title}</Text>
                </Card>
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar barStyle="light-content" />

            {loading?<><Text style={[styles.text]}>Loading Photos..</Text></>:
            !error?<>
            <FlatList 
                style={{height:'100%'}}
                data={photosList}
                renderItem={imageRender}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
            /></>:<><Text style={[styles.text,{color:'red',fontWeight:500}]}>Error Occured While Loading Photos..</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{dispatch(fetchPhotosList())}}>
                        <Text style={styles.buttonText}>Reload</Text>
                    </TouchableOpacity>
                    </>}

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      padding:2,
      flex:1,
      margin: 5,
    },
    header: {
      fontSize: 12,
      fontFamily: 'Cochin'
    },
    image:{
        flex:1,
        borderRadius:5,
        height: undefined, 
        width: '100%', 
    },
    imageContainer: {
        width:'100%',
        padding: 5,
        aspectRatio:1,
        justifyContent:'center'
    },
      text:{
        textAlign:'center',
        fontSize:20,
        fontWeight:"bold",
        padding:2,
        margin:5
      },
      loader: {
        position:'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: 1,
      },
      errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize:20
      },
      button: {
        backgroundColor: 'brown',
        padding: 10,
        borderRadius: 5,
        width:'30%',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText: {
        color: 'white',
        fontSize: 20,
      },

  })