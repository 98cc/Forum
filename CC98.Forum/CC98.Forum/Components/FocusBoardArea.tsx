﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../Props/FocusBoard';
import { FocusBoardProps } from '../Props/FocusBoardProps';
import { FocusBoardAreaState } from '../States/FocusBoardAreaState';
import { FocusBoardSingle } from './FocusBoardSingle';
import * as Utility from '../Utility';
/**
 * 表示我关注的版面列表区域
 */
export class FocusBoardArea extends React.Component<{}, FocusBoardProps> {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        //先看一下有没有缓存的帖子数据
        var data = Utility.getStorage("focusBoardList");
        console.log(data);
        if (!data) {
            data = [];
        }
        this.state = {
            data: data
        };
    }

    /**
     * 将我关注的版面排列好
     */
    async componentDidMount() {
        //先看缓存里有没有关注版面列表的数据
        let data: FocusBoard[] = Utility.getStorage("focusBoardList");
        if (data) {
            this.setState({ data: data });
        }
        //没有就自己去服务器获取
        else {
            data = [];
            let token = Utility.getLocalStorage("accessToken");
            //获取关注版面的id列表
            let userInfo = Utility.getLocalStorage("userInfo");
            let boardid = userInfo.customBoards;
            for (let i in boardid) {
                let response = await fetch(`http://apitest.niconi.cc/board/${boardid[i]}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                let boardInfo = await response.json();
                data.push({ id: boardid[i], name: boardInfo.name });
            }
            this.setState({ data: data });
            //存到缓存里
            Utility.setStorage("focusBoardList", data);
        }
    }

    render() {
        return <div className="focus-board-area">{this.state.data.map(coverFocusBoard)}</div>;
    }
}

function coverFocusBoard(item: FocusBoard) {
    return <FocusBoardSingle id={item.id} name={item.name} />;
}