<template>
    <div>
        <a href="#" class="chat_panel"><div class="chat-closed" @click="toggleChat">Чат</div></a>
        <div class="chat" v-if="isChatVisible">
            <a href="#" @click="toggleChat"><div class="chat-close">&#10052;</div></a>
            <div class="chat-header">
                <div class="consultant-photo"></div>
                <h3 class="consultant-name">{{consultantName}}</h3>
                <p class="consultant-p">Консультант</p>
            </div>
            <div class="chat-messages clearfix" ref="chatMsgs">
                <div class="msg-block" v-for="chatMsg in chatMessages">
                    <div class="msg-text" :class="chatMsg.author">{{chatMsg.text}}</div>
                    <div class="msg-time">{{chatMsg.time}}</div>
                </div>
            </div>
            <div class="user-message">
                <textarea autofocus class="user-msg" placeholder="Введите сообщение и нажмите Ctrl-Enter" v-model="newMsgText" @keyup.ctrl.enter="addUserMessage()"></textarea>
                <button class="smiles-btn"></button>
                <button class="attachfile-btn"></button>
            </div>
        </div>
    </div>
</template>
<script>
    import LocalStorage from '../services/storage.services.js';
    export default {
        name: 'Chat',
        data: () =>({
            chatMessages: [],
            consultantName: 'Ольга',
            isChatVisible: false,
            newMsgText:'',
        }),
        methods:{
            toggleChat(){
                this.isChatVisible = !this.isChatVisible;
                if (this.isChatVisible){
                    this.scrollMessages();
                }
            },
            addUserMessage(){
                this.$emit( "add-user-message", this.newMsgText);
                // event.preventDefault();
                this.newMsgText="";
                this.scrollMessages();
            },
            scrollMessages(){
                this.$nextTick(function(){
                    const messages = this.$refs.chatMsgs;
                    if (messages) {
                        messages.scrollTop = messages.scrollHeight;
                    }
                });
            }
        },
        mounted(){
            this.chatMessages = LocalStorage.getItem('chatMessages');
            console.log ('Chat:');
            console.log(this.chatMessages);
        },
    }
</script>
<style scoped>
    .clearfix {
        content: '';
        display: table;
        clear: both;
    }
    .chat-open{
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 20%;
        text-decoration: none;
    }
    .chat-closed{
        width: 30%;
        position: fixed;
        right: 20px;
        bottom: 20px;
        line-height: 25px;
        text-align: center;
        background-color: darkgray;
        color: white;
        border-radius: 2px;
    }
    .chat_panel{
        text-decoration: none;
    }
    .chat-img{
        width: 50px;
        height: 50px;
    }
    .chat{
        width: 30%;
        height: 50%;
        position: fixed;
        right: 20px;
        bottom: 20px;
        background-color: gainsboro;
        border: 1px solid darkgray;
        border-radius: 3px;
        border-top-right-radius: 20px;
    }
    .chat-close{
        width: 20px;
        height: 20px;
        font-size: 18px;
        line-height: 20px;
        position: absolute;
        top: -10px;
        left: -10px;
        border-radius: 50%;
        background-color: gray;
        color: white;
        text-align: center;
    }
    .chat-header{
        background-color: darkgray;
        color: white;
        padding: 10px;
        border-top-right-radius: 20px;
    }
    .consultant-photo{
        background-image: url("../../img/iconfinder_user-secret_1608462.svg");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        display: inline-block;
        float: left;
        margin-right: 10px;
    }
    .user-message{
        width: 89%;
        position: absolute;
        bottom: 10px;
        left: 10px;
        background-color: white;
        text-align: right;
        padding: 5px;
    }
    .user-msg{
        width: 75%;
        border: none;
        resize: none;
    }
    .msg-block{
        width: 90%;
        display: flex;
        justify-content: flex-start;
    }
    .chat-messages{
        height: 55%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow-y: auto;
        margin: 5px;
        padding: 5px 0px;
    }
    .msg-block{
        display: flex;
        padding: 5px;
    }
    .msg-block:first-of-type{
        margin-top: auto;
    }
    .consultant-block{
        justify-content: flex-start;
    }
    .consultant-name{
        display: inline-block;
        margin: 5px;
    }
    .consultant-p{
        margin: 0px 45px;
    }
    .user-block{
        justify-content: flex-end;
    }
    .msg-time{
        padding: 5px;
        margin-right: 10px;
    }
    .msg-consultant-before{
        width: 7px;
        height: 7px;
        background-color: lightcyan;
        transform: rotate(45deg);
        position: absolute;
        top: 10px;
        left: -3px;
    }
    .msg-user-before{
        width: 7px;
        height: 7px;
        background-color: bisque;
        transform: rotate(45deg);
        position: absolute;
        top: 10px;
        left: -3px;
    }
    .msg-text{
        padding: 5px;
        border-radius: 2px;
        position: relative;
        width: 60%;
        word-break: break-word;
        margin-right: 10px;
    }
    .consultant{
        background-color: lightcyan;
        float: left;
        order: 0;
    }
    .user{
        background-color: bisque;
        float: right;
        order: 1;
    }
    .smiles-btn{
        width: 15px;
        height: 25px;
        background-image: url("../../img/iconfinder_misc-_smile__1276846.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        opacity: 0.5;
        background-color: white;
        border: none;
        margin-right: 2px;
    }
    .attachfile-btn{
        width: 7%;
        height: 25px;
        background-image: url("../../img/iconfinder_clip-save-attach-file_2205233.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        opacity: 0.5;
        background-color: white;
        border: none;
    }
</style>
