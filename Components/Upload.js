import React from 'react';
import {StyleSheet,Text, View, FlatList,Image, Button,TextInput,Platform} from 'react-native';
import { connect } from 'react-redux';
import {uploadImage} from '../API/IMGURAPI'
import * as ImagePicker from 'expo-image-picker';

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: [],
            loaded : false,
            send : false
        }
        this._pickImage = this._pickImage.bind(this)
        this._permission = this._permission.bind(this)
        this._uploadPicture = this._uploadPicture.bind(this)
    }

    _permission = async () =>{
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }
     _pickImage = async () => {
         await this._permission()
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64 : true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({
              image:result.base64,
              loaded : true,
              send:false
          });
        }
      };
      _uploadPicture = async () =>{
        console.log("upload activé !!!!")
        console.log(this.state.image)
        // let imageCorrige = this.state.image.slice(5,this.state.image.length)
        // console.log(imageCorrige)
        console.log("this.props.access_token ",this.props.access_token)
        const upload = await uploadImage(this.props.access_token,this.state.image)
        console.log("upload : ",upload)
        if (upload){
            this.setState({
                image:[],
                loaded : false,
                send : true
            })
        }
      }
    render(){
        return(
           <View>
               <Button
               title="Import Image"
               onPress={this._pickImage}>
               </Button>

               {
                this.state.loaded  ? 
                <View>
                    <Image
                        style = {styles.image}
                        source={{uri:'data:image/jpeg;base64,'+this.state.image}}>
                        </Image>
                        <Button
                            title="Upload Image"
                            onPress={this._uploadPicture}
                        >
                        </Button>
                </View>
                    
                        : null
                }
                {
                    this.state.send ? 
                    <View>
                        <Text>Votre image a bien été uploadé sur votre compte</Text>
                    </View> : null
                }
                
           </View> 
        )
    }
}
const styles = StyleSheet.create({
    image:{
        width: 150,
        height: 180,
        margin: 5,
        backgroundColor: 'gray',
    }
})
const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        access_token : state.access_token
    }
}

export default connect(mapStateToProps)(Upload)