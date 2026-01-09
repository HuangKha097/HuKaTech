import React from 'react';
 ;
import classNames from "classnames/bind";
import style from "../assets/css/Table.module.scss"


const cx = classNames.bind(style);
const Table = () => {
    const testheader = ["a","b","c","d","e","f"];

    return (
        <table>
            <thead>
            <tr>
                {testheader.map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr> <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr> <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
            </tbody>
        </table>
    );
};

export default Table;
