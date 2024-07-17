import { useEffect, useState } from 'react'

export default function UseSocket() {

    const [websocket, setWebsocket] = useState(null)

    useEffect(() => {

        // const ws = new WebSocket("ws://localhost:8080")
        const ws = new WebSocket("wss://wechat-1-0.onrender.com/")

        ws.onopen = () => {
            console.log("connected to websocket")
        }

        ws.onclose = () => {
            console.log('disconnected')
        }

        setWebsocket(ws)

        return () => {
            if(ws){
                ws.close()
            }
        }

    }, [])

    return websocket

}
