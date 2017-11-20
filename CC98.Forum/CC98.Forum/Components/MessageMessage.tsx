﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageMessageState } from '../States/MessageMessageState';
import { MessagePersonInfo } from '../Props/MessagePersonInfo';
import { MessagePerson } from './MessagePerson';
import { MessageWindow } from './MessageWindow';
import * as Utility from '../Utility';

/**
 * 我的私信，包括最近联系人列表和聊天窗口两个组件
 */
export class MessageMessage extends React.Component<{}, MessageMessageState> {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 5298, name: '系统', portraitUrl: 'http://www.cc98.org/pic/anonymous.gif', message: [{
                    id: 5298, senderId: 5298, receiverId: 533688, content: "默认内容", isRead: true, time: new Date(),
                }]
            }],
            chatObj: {
                id: 5298, name: '系统', portraitUrl: 'http://www.cc98.org/pic/anonymous.gif', message: [{
                    id: 5298, senderId: 5298, receiverId: 533688, content: "默认内容", isRead: true, time: new Date(),
                }]
            }
        };
        //如果没有设置默认的state，render第一次渲染的时候state为空，MessageWindow组件会报错
    }

    async componentWillMount() {
        let token = Utility.getLocalStorage("accessToken");

        //获取到本人信息
        let myInfo = Utility.getLocalStorage("userInfo");

        //创建一个数组存储联系人信息
        let recentContact = await Utility.getRecentContact(0, 6);

        //默认第一个人为聊天对象
        this.setState({ data: recentContact, chatObj: recentContact[0] });
        //默认选中第一个联系人
        $(`#${recentContact[0].name}`).addClass('message-message-pFocus');
    }

    //对this.stata.data进行批量化转化为JSX的函数，每个JSX可点击改变state里聊天对象的信息
    coverMessagePerson = (item: MessagePersonInfo) => {
        const changeChatName = () => {
            this.setState({ chatObj: item });
		    //给选中的聊天对象添加选中效果
		    $('.message-message-pList > div').removeClass('message-message-pFocus');
		    $(`#${item.name}`).addClass('message-message-pFocus');
        };
        return <div onClick={changeChatName} id={`${item.name}`}><MessagePerson data={item} /></div>;
	};

	render() {
        //给我的私信添加选中样式
        $('.message-nav > div').removeClass('message-nav-focus');
        $('#message').addClass('message-nav-focus');
        //创建联系人列表和聊天窗口
        return (<div className="message-message">
                <div className="message-message-people">
                    <div className="message-message-pTitle">近期私信</div>
                    <div className="message-message-pList">{this.state.data.map(this.coverMessagePerson)}</div>
                </div>
                <MessageWindow data={this.state.chatObj} />
            </div>);
    }
}

//查找数组arr中是否存在元素的名字为obj
function contains(arr , obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i].name === obj) {
            return true;
        }
    }
    return false;
}