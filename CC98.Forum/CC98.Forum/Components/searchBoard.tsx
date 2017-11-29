﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusBoard } from '../Props/FocusBoard';
import { FocusBoardProps } from '../Props/FocusBoardProps';
import { FocusBoardAreaState } from '../States/FocusBoardAreaState';
import * as Utility from '../Utility';
/**
 * 表示我搜索到的版面列表区域
 */
export class SearchBoard extends React.Component {

   
    render() {
        let data = Utility.getStorage("searchBoardInfo");
        return (<div className="focus-root">
                    <div className="focus">
                        <div className="focus-title"><i className="fa fa-home" aria-hidden="true"></i>搜索/版面</div>
                        <div className="focus-board-area">
                            {data.map(coverFocusBoard)}
                        </div>
                    </div>
                </div>);
    }
}

function coverFocusBoard(item: FocusBoard) {
    //点击版面名称会显示相应版面的帖子
    let boardUrl = `/list/${item.id}/normal/`;
    return <a href={boardUrl} target="_blank"><div className="focus-board">{item.name}</div></a>;
}