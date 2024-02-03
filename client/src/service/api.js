import axios from "axios"

const url = "http://localhost:8000"

export const adduser = async(data) =>{
    try{
        let response = await axios.post(`${url}/add`, data)
        return response.data
    }catch(error){
        console.log('error calling adduser api', error.message)
    }
}

export const getUsers = async() =>{
    try{
        let response = await axios.get(`${url}/users`)
        if(response){
            console.log("users = ", response.data)
            return response.data
        }
    }catch(error){
        console.log('error calling getuser api', error.message)
    }
}

export const setConversation = async(data)=>{
    try {
        let response = await axios.post(`${url}/conversation/c-add`, data)
        return response.data
    } catch (error) {
        console.log("error calling setconversation api", error.message)
    }
}

export const getConversation = async(data)=>{
    try {
        let response = await axios.post(`${url}/conversation/c-get`, data)
        return response.data
    } catch (error) {
        console.log("error calling getconversation api", error.message)
    }
}

export const newMessage = async(data)=>{
    try {
        let response = await axios.post(`${url}/message/m-new`, data)
        return response.data
    } catch (error) {
        console.log("error calling newmessage api", error.message)
    }
}

export const getMessage = async(id)=>{
    try {
        let response = await axios.get(`${url}/message/m-get/${id}`)
        return response.data
    } catch (error) {
        console.log("error calling getmessage api", error.message)
    }
}

export const uploadFile = async (data) =>{
    console.log(data.get("image"))
    try {
        let response = await axios.post(`${url}/file/upload`, data, { headers: { "Content-Type": "multipart/form-data" } })
        if(response.status == 200){
            console.log("response.data : " , response.data)
            return response.data
        }else{
            console.log("invalid api response")
        }
    } catch (error) {
        console.log("error calling uploadfile api", error.message)
    }

}