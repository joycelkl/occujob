const express = require('express');


class ChatroomRouter {
    constructor(chatroomServices, io) {
        this.chatroomServices = chatroomServices;
        this.io = io;
        this.io.on('connection', (socket) => {
            console.log('we have a new connection!!')
            socket.emit('chatroomIDrequest');
            socket.on('sendingChatroomID', chatroomID => {
                console.log('received chatroom id', chatroomID)
                socket.join(chatroomID)
            })


            socket.on('disconnect', () => {
                console.log('User has left!!!')
            })
        })
    }

    router = () => {
        const router = express.Router();

        router.post('/retrieve/chatroomid', (req, res) => {
            const { chatterID, userID } = req.body
            return this.chatroomServices.retrieveChatroomID(chatterID, userID, req.user.type)
                .then((chatroomID) => {
                    return res.json(chatroomID)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.get('/retrieve/chatroomHistory/:chatroomID', (req, res) => {
            console.log('route for chat history is okay', req.params.chatroomID)

            return this.chatroomServices.retrieveChatroomHistory(req.params.chatroomID)
                .then((chatroomHistory) => {
                    console.log('chatHistory in router', chatroomHistory)
                    return res.json(chatroomHistory)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.post('/sendMessage', (req, res) => {
            const { chatroomID, senderType, user_id, message } = req.body
            console.log('route for send message is okay', chatroomID, senderType, user_id, message)

            return this.chatroomServices.sendingMessage(chatroomID, senderType, user_id, message)
                .then((chatroomHistory) => {
                    console.log('returned chatroomHistory', chatroomHistory)
                    this.io.to(chatroomID).emit('sendMsg', chatroomHistory)
                    this.io.to(chatroomID).emit("receivedMsg", senderType, chatroomID)
                    return res.json(chatroomHistory)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.get('/getAllChats', (req, res) => {
            console.log('get all chats', req.user.id, req.user.type)

            return this.chatroomServices.retrieveAllChats(req.user.id, req.user.type)
                .then((allChats) => {
                    console.log('returned allChats', allChats)
                    return res.json(allChats)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.get('/getUnreadMsg/:chatroomID', (req, res) => {
            console.log('get unreadMsg count chatroomId', req.params.chatroomID, req.user.type)

            return this.chatroomServices.retrieveUnreadMsg(req.params.chatroomID, req.user.type)
                .then((unreadMsg) => {
                    console.log('unreadMsg Count', unreadMsg)
                    return res.json(unreadMsg)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })

        })

        router.put('/resetUnreadMsg/:chatroomID', (req, res) => {
            console.log('reset unreadMsg chatroomId', req.params.chatroomID, req.user.type)

            return this.chatroomServices.resetUnreadMsg(req.params.chatroomID, req.user.type)
                .then((data) => {
                    console.log('reset unread returned data', data)
                    return res.json(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

        router.get('/navbarUnreadMsg', (req, res) => {
            console.log('getting navbar unread msg', req.user.id, req.user.type)

            return this.chatroomServices.retrieveNavUnreadMsg(req.user.id, req.user.type).then((navUnread) => {
                console.log('nav unread count', navUnread)
                return res.json(navUnread)
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })

        })

        router.get('/allUnreadMsgCount', (req, res) => {
            console.log('getting navbar unread msg', req.user.id, req.user.type)

            return this.chatroomServices.retrieveAllUnreadMsgIndDis(req.user.id, req.user.type).then((navUnread) => {
                console.log('all chatroom unread count', navUnread)
                return res.json(navUnread)
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })

        })

        return router;
    }

}

module.exports = ChatroomRouter;