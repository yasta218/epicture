import React from 'react'
import { StyleSheet, Text, View,Modal,Pressable,Linking,SafeAreaView,TextInput } from 'react-native';
import { connect } from 'react-redux';
import {getToken} from '../API/IMGURAPI';


 class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false
    };
    this.searchedUsername="";
    this.pwd="";
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }


 handleAuth = async () => {
  //  let url = await Linking.getInitialURL()
    let data_login = await getToken()
    let access_token = data_login[0]
    console.log("access_token",access_token)
    let pseudo = data_login[1]
    this.setModalVisible(false)
    // on transmet au store redux l'access_token 
    const action = {type: "CONNECT",access_token: access_token,pseudo:pseudo}
    this.props.dispatch(action)
    // On quitte le screen Login pour se rendre sur la vue MyImage
    this.props.navigation.navigate('MyImage',{accessToken: access_token})
    // await Linking.openURL('https://api.imgur.com/oauth2/authorize?client_id=86e6f7f6dc3565e&response_type=token')
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

  render() {
    const { modalVisible,text,number,pseudo } = this.state;
    // const [text, onChangeText] = React.useState("Useless Text");
    // const [number, onChangeNumber] = React.useState(null);
    return (
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
    );
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
      pseudo: state.pseudo,
      access_token : state.access_token
  }
}

export default connect(mapStateToProps)(Login)