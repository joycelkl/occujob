class ChatroomServices {
    constructor(knex) {
        this.knex = knex;
    }

    retrieveChatroomID(chatterID, userID, userType) {
        if (userType == 'er') {
            return this.knex('chatroom')
                .where('chatroom.chat_employer_id', userID)
                .andWhere('chatroom.chat_employee_id', chatterID)
                .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                .select('chatroom.*', 'employer.er_name', 'employee.ee_name')
                .then((chatroom) => {
                    if (chatroom.length === 0) {
                        return this.knex('chatroom')
                            .insert({
                                chat_employer_id: userID,
                                chat_employee_id: chatterID
                            })
                            .returning('chatroom_id')
                            .then((chatroom) => {

                                return this.knex('chatroom')
                                    .where('chatroom.chatroom_id', Number(chatroom))
                                    .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                                    .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                                    .select('chatroom.*', 'employer.er_name', 'employee.ee_name')
                                    .then((chatroom) => {
                                        return chatroom
                                    })
                            })
                            .catch((err) => {
                                console.error(err)
                                throw new Error(err)
                            })
                    } else {
                        return chatroom
                    }
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                });
        } else {
            return this.knex('chatroom')
                .where('chatroom.chat_employer_id', chatterID)
                .andWhere('chatroom.chat_employee_id', userID)
                .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                .select('chatroom.*', 'employer.er_name', 'employee.ee_name')
                .then((chatroom) => {
                    if (chatroom.length === 0) {
                        return this.knex('chatroom')
                            .insert({
                                chat_employer_id: chatterID,
                                chat_employee_id: userID
                            })
                            .returning('chatroom_id')
                            .then((chatroom) => {

                                return this.knex('chatroom')
                                    .where('chatroom.chatroom_id', Number(chatroom))
                                    .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                                    .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                                    .select('chatroom.*', 'employer.er_name', 'employee.ee_name')
                                    .then((chatroom) => {
                                        return chatroom
                                    })
                            })
                            .catch((err) => {
                                console.error(err)
                                throw new Error(err)
                            })
                    } else {
                        return chatroom
                    }
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                });
        }

    }

    retrieveChatroomHistory(chatroomID) {
        return this.knex('message')
            .where('message.chatroom_id', chatroomID)
            .join('chatroom', 'chatroom.chatroom_id', '=', 'message.chatroom_id')
            .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
            .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
            .select('message.*', 'employer.er_name', 'employee.ee_name')
            .orderBy('created_at', 'asc')
            .then((chatHistory) => {
                console.log('chatHistory', chatHistory)
                return chatHistory
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            });
    }

    sendingMessage(chatroomID, senderType, user_id, message) {
        if (senderType == 'er') {
            return this.knex('message')
                .insert({
                    chatroom_id: chatroomID,
                    sender_type: senderType,
                    sender_employer_id: user_id,
                    content: message
                })
                .returning('message_id')
                .then((msgID) => {
                    return this.knex('message')
                        .where('message.message_id', Number(msgID[0]))
                        .join('chatroom', 'chatroom.chatroom_id', '=', 'message.chatroom_id')
                        .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                        .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                        .select('message.*', 'employer.er_name', 'employee.ee_name')
                        .then((sentMsg) => {
                            return sentMsg
                        })
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                })
        } else {
            return this.knex('message')
                .insert({
                    chatroom_id: chatroomID,
                    sender_type: senderType,
                    sender_employee_id: user_id,
                    content: message
                })
                .returning('message_id')
                .then((msgID) => {
                    console.log('message id', msgID[0])
                    return this.knex('message')
                        .where('message.message_id', Number(msgID[0]))
                        .join('chatroom', 'chatroom.chatroom_id', '=', 'message.chatroom_id')
                        .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                        .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                        .select('message.*', 'employer.er_name', 'employee.ee_name')
                        .then((sentMsg) => {
                            return sentMsg
                        })
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                })
        }

    }

    retrieveAllChats(userID, userType) {
        if (userType == 'er') {
            return this.knex('chatroom')
                .where('chatroom.chat_employer_id', userID)
                .join('message', 'message.chatroom_id', '=', 'chatroom.chatroom_id')
                .join('employee', 'employee.ee_id', '=', 'chatroom.chat_employee_id')
                .select('chatroom.*', 'employee.ee_name', 'message.*', { msgCreate: 'message.created_at' })
                .distinctOn('chatroom.chatroom_id')
                .orderBy([{ column: 'chatroom.chatroom_id' }, { column: 'message.message_id', order: 'desc' }])
                .then((allChats) => {
                    return allChats
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                })
        } else {
            return this.knex('chatroom')
                .where('chatroom.chat_employee_id', userID)
                .join('message', 'message.chatroom_id', '=', 'chatroom.chatroom_id')
                .join('employer', 'employer.er_id', '=', 'chatroom.chat_employer_id')
                .select('chatroom.*', 'employer.er_name', 'message.*', { msgCreate: 'message.created_at' })
                .distinctOn('chatroom.chatroom_id')
                .orderBy([{ column: 'chatroom.chatroom_id' }, { column: 'message.message_id', order: 'desc' }])
                .then((allChats) => {
                    return allChats
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                })
        }

    }

    retrieveUnreadMsg(chatroomID, userType) {
        return this.knex('message')
            .where('chatroom_id', chatroomID)
            .whereNot('sender_type', userType)
            .andWhere('msgread', 1)
            .count('msgread')
            .then((unreadMsg) => {
                return unreadMsg
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            })
    }

    resetUnreadMsg(chatroomID, userType) {
        return this.knex('message')
            .where('chatroom_id', chatroomID)
            .whereNot('sender_type', userType)
            .andWhere('msgread', 1)
            .update('msgread', 0)
            .count('msgread')
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.error(err)
                throw new Error(err)
            })

    }

    retrieveNavUnreadMsg(userID, userType) {

        if (userType == 'er') {
            return this.knex('chatroom')
                .where('chat_employer_id', userID)
                .join('message', 'message.chatroom_id', '=', 'chatroom.chatroom_id')
                .whereNot('message.sender_type', userType)
                .andWhere('msgread', 1)
                .count('msgread')
                .then((navUnread) => {
                    console.log('nav unread in service', navUnread)
                    return navUnread
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                })

        } else {
            return this.knex('chatroom')
                .where('chat_employee_id', userID)
                .join('message', 'message.chatroom_id', '=', 'chatroom.chatroom_id')
                .whereNot('message.sender_type', userType)
                .andWhere('msgread', 1)
                .count('msgread')
                .then((navUnread) => {
                    console.log('nav unread in service', navUnread)
                    return navUnread
                })
                .catch((err) => {
                    console.error(err)
                    throw new Error(err)
                })
        }

    }

}


module.exports = ChatroomServices