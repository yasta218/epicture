import React from 'react'
import { StyleSheet, Text, View,Modal,Pressable,Linking,SafeAreaView,TextInput,Button } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import {getToken,getFavoriteImage} from '../API/IMGURAPI';


 class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      isOauthView : false,
      isRefreshToken : false
    };
    this.searchedUsername="";
    this.pwd="";
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }


 handleAuth = async () => {
  //  let url = await Linking.getInitialURL()
  
    this.setState({
      isOauthView : true
    },()=>{
      Linking.getInitialURL().then((url) => {
        console.log("url page oauth",url);
    });
    })
    // console.log("data_login",data_login)
    // let data_login = await getToken()
  
  }

  _onNavigationStateChange = async (webViewState)=>{
    console.log('first part url : ',webViewState.url.slice(0,20))
    console.log(webViewState.url)

    if(webViewState.url.slice(0,20)  == "exp://127.0.0.1:1900" & webViewState.url.length >21){
      console.log("here")
      let url =webViewState.url
      console.log(url)
      // récupère le refresh token
      let refresh_token = url.match(/\&(?:refresh_token)\=([\S\s]*?)\&/)[1]
      let access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]
      let pseudo=url.match(/account_username=([a-zA-Z0-9]+)\&/)[1]
      console.log("refresh_token", refresh_token)
      //get information from account
      // let data_login = await getToken(refresh_token)
      // console.log("data_login : ", data_login)
      // let access_token = data_login[0]
      // let pseudo = data_login[1]
      
      
      // initialize favorites
      let favorite =await getFavoriteImage(access_token,pseudo) 

      // transmitt access_token,pseudo and favorites to redux
      const action = {type: "CONNECT",refresh_token: refresh_token,access_token: access_token,pseudo:pseudo,listFavorite : favorite}
      this.props.dispatch(action)

      // change front 
      this.setModalVisible(false)
      this.setState({
      isOauthView : false,
      isRefreshToken:true
    })
    }
    
    console.log("URL : ",webViewState.url)
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  _searchedUsernameInputChange(text){
    console.log("change !!")
    this.searchedUsername  = text
  }
  _searchedPwdInputChange(text){
    this.pwd  = text
  }
  componentDidMount(){
    console.log("composant monté")
    Linking.getInitialURL().then((url) => {
      console.log('url de départ',url);
      console.log(this.state.cookie)
  });
  }
  componentDidUpdate(){
    console.log("composant mis à jour")
    Linking.getInitialURL().then((url) => {
      console.log(url.slice(0,20));
      if(url.slice(0,20) == "exp://127.0.0.1:19000"){
        console.log('url avec access.token',url.slice(0,20))

      }
      console.log(this.state.cookie)
  })
  }

  render() {
    const { modalVisible,text,number,pseudo } = this.state;
    // const [text, onChangeText] = React.useState("Useless Text");
    // const [number, onChangeNumber] = React.useState(null);
    console.log("isRefreshToken:",this.state.isRefreshToken)
        if(this.state.isOauthView){
            return (
              <WebView source={{ uri: 'https://api.imgur.com/oauth2/authorize?response_type=token&client_id=86e6f7f6dc3565e' }}
              onNavigationStateChange={this._onNavigationStateChange.bind(this)} 
              javaScriptEnabled = {true}
              domStorageEnabled = {true}
              injectedJavaScript = {this.state.cookie}
              startInLoadingState={true}/>
            )
        }else{

          if(!this.state.isRefreshToken ){
            return(
              <View style={styles.centeredView}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                  }}
                >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TextInput
                        onChangeText={(text) => this._searchedUsernameInputChange(text)}
                        placeholder="username"
                        keyboardType="default"
                      />
                      <TextInput
                        onChangeText={(text) => this._searchedPwdInputChange(text)}
                        placeholder="password"
                        keyboardType="default"
                      />
                    
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() =>this.handleAuth()}
                      >
                        <Text style={styles.textStyle}>Login</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
              </View>
            )
          }else{
            return(
              <View style={styles.centeredView}>
                <Text>Welcome, You're connected</Text>
                <Button
                  title="Next"
                  onPress={()=>{
                    this.props.navigation.navigate('MyImage',{accessToken: this.props.access_token})
                  }}></Button>
              </View>
            )
          }
          
        }
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
const mapStateToProps = state => {
  return {
      refresh_token : state.refresh_token,
      pseudo: state.pseudo,
      access_token : state.access_token,
      listFavorite : state.listFavorite
  }
}

export default connect(mapStateToProps)(Login)