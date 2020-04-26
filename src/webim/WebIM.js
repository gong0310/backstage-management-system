import config from './WebIMConfig'
import websdk from 'easemob-websdk'
// import emedia from "easemob-emedia"; // 音频消息
// import webrtc from "easemob-webrtc"; // 视频消息

var WebIM = {}
// window.WebIM 将 WebIM变量提升到全局
WebIM = window.WebIM = websdk

WebIM.config = config

WebIM.conn = new WebIM.connection({
    url: WebIM.config.xmppURL,
    apiURL: WebIM.config.apiURL,
    appkey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    heartBeatWait: WebIM.config.heartBeatWait, // 视频聊天需要安装 easemob-webrtc
    isAutoLogin: true,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    delivery: WebIM.config.delivery,
})

// 兼容
if (!WebIM.conn.apiUrl) {
	WebIM.conn.apiUrl = WebIM.config.apiURL;
}
// WebIM.WebRTC = webrtc;
// WebIM.EMedia = emedia;

export default WebIM