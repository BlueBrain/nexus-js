// script to test download function with 1MB and 1GB file size
// run test with command: parcel tests/streamsaver.html
// then open link in various browsers, click button to download file

import { downloadAttachment } from '../index.js';
import streamSaver from 'StreamSaver';


console.log(streamSaver);
const div = document.createElement('div');
div.textContent = 'StreamSaver Support: '+(streamSaver.supported?'Yes':'No');
document.body.appendChild(div);

var btn = document.createElement('button');
btn.innerHTML = '1MB File';
btn.onclick = () => downloadAttachment('https://cors-anywhere.herokuapp.com/http://speedtest.ftp.otenet.gr/files/test1Mb.db', 'test', 'cESAFaZMpLGS3jrp');
document.body.appendChild(btn);

btn = document.createElement('button');
btn.innerHTML = '1GB File';
btn.onclick = () => downloadAttachment('https://cors-anywhere.herokuapp.com/http://speedtest.ftp.otenet.gr/files/test1Gb.db', 'test', 'cESAFaZMpLGS3jrp');
document.body.appendChild(btn);

