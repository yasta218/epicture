import axios from 'axios';
export  async function getToken(refresh_token){
    return new Promise((resolve,reject) =>{
        axios.post('https://api.imgur.com/oauth2/token', {
            client_id : "86e6f7f6dc3565e",
            client_secret :'1ba028d00be6404454ca0c66c5b675b86cc26971',
            grant_type : 'refresh_token',
            refresh_token : refresh_token
        })
        .then(res => {
            resolve([res.data.access_token, res.data.account_username]) 
        })
        .catch(err => {
            console.log("error: ", err)
            reject(err)
        })
    })
   
    // const url = 'https://api.imgur.com/oauth2/authorize?client_id=86e6f7f6dc3565e&response_type=token'
    // return fetch(url)
    // .then((response) => response.json())
    // .catch((error) => console.log(error))
}

export  async function getToken2(){
    return new Promise((resolve,reject) =>{
        console.log("Im heeeeeeeeererere")
        axios.get('https://api.imgur.com/oauth2/authorize', {
            client_id : "86e6f7f6dc3565e",
            response_type :'token',
        })
        .then(res => {
            console.log("success !!!")
            resolve(res) 
        })
        .catch(err => {
            console.log("error: ", err)
            reject(err)
        })
    })
   
    // const url = 'https://api.imgur.com/oauth2/authorize?client_id=86e6f7f6dc3565e&response_type=token'
    // return fetch(url)
    // .then((response) => response.json())
    // .catch((error) => console.log(error))
}

export async function getImage(accessToken){
    // https://api.imgur.com/3/account/me/images
    return new Promise((resolve,reject) => {
        axios.get('https://api.imgur.com/3/account/me/images',{
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })
    .then(res =>{
        resolve(res.data.data) 

    })
    .catch(err => {
        reject(err)
    })
    })
    
}

export async function getFavoriteImage(accessToken,pseudo){
    // https://api.imgur.com/3/account/me/images
    return new Promise((resolve,reject) => {
    console.log("test accessTok :", accessToken)
        let myurl =  'https://api.imgur.com/3/account/me/favorites'
        console.log(myurl)
        axios.get(myurl,{
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })
    .then(res =>{
        console.log("success")
        resolve(res.data.data) 

    })
    .catch(err => {
        console.log("fail bro")
        console.log(myurl)
        console.log(accessToken)
        console.log(err)
        reject(err.response)
    })
    })
    
}

export async function getImageByText(text){
    return new Promise((resolve,reject) => {
        let clientId = "86e6f7f6dc3565e"
        axios.get(`https://api.imgur.com/3/gallery/search/top?q=${text}`,{
            headers:{
                'Authorization': `Client-ID ${clientId}`
            }
        })
        .then(res =>{
            resolve(res.data.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export async function uploadImage(access_token,urlImage){
    return new Promise((resolve,reject) =>{

        // let filename = urlImage.split('/').pop();
        // let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `image/${match[1]}` : `image`;
        let config = {
            headers:{
                "Content-type": "multipart/form-data",
                Authorization : 'Bearer ' +  access_token
            }
        }
       let data =new FormData()
       data.append("image",urlImage)
        axios.post(`https://api.imgur.com/3/image`,data,config)
        .then(res =>{
            resolve(true)
        })
        .catch(err =>{
            console.log("echec")
            console.log(urlImage)
            console.log(config)
            console.log(access_token)
            console.log(err)
            reject(err)
        })
    })
}
// https://api.imgur.com/3/gallery/search/top?q=djokovic

