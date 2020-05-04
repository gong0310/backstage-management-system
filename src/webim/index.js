import WebIM from './WebIM'

export default function () {
//     开启WebIM事件监听
    WebIM.conn.listen({
        onOpened: function ( ) { //连接成功回调 
            console.log('连接成功')
            window.localStorage.setItem('islogin',true)
        },         
        onClosed: function ( message ) { //连接关闭回调
            console.log(message, '连接失败')
            window.localStorage.setItem('islogin',false)
        },
    })

}
