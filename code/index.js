const net = require('net');
let server = net.createServer(function (socket) {
    console.log(3)
    socket.once('data', function (data) {
        console.log(2)
        console.log(JSON.stringify(data))
        if (!data || data[0] !== 0x05) return socket.destroy();
        let addrLen = 0, remoteAddr = null, remotePort = null;
        socket.write(Buffer.from([5, 0]), function (err) {
            if (err) socket.destroy();
            socket.once('data', (data) => {
                console.log(1)
                if (data.length < 7 || data[1] !== 0x01) return socket.destroy();  // 只支持 CONNECT 
                try {
                    addrtype = data[3];// ADDRESS_TYPE 目标服务器地址类型
                    if (addrtype === 3) {//0x03 域名地址(没有打错，就是没有0x02)，
                        addrLen = data[4];//域名地址的第1个字节为域名长度，剩下字节为域名名称字节数组
                    } else if (addrtype !== 1 && addrtype !== 4) {
                        return socket.destroy();
                    }
                    remotePort = data.readUInt16BE(data.length - 2);//最后两位为端口值
                    if (addrtype === 1) {// 0x01 IP V4地址
                        remoteAddr = data.slice(3, 7).join('.');
                    } else if (addrtype === 4) { //0x04 IP V6地址
                        // remoteAddr = data.slice(3, 19);//IP V6长度为 16
                        return socket.write(Buffer.from([0x05, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));//不支持IP V6
                    } else {//0x03 域名地址(没有打错，就是没有0x02)，域名地址的第1个字节为域名长度，剩下字节为域名名称字节数组
                        remoteAddr = data.slice(5, 5 + addrLen).toString("binary");
                    }
                    let remote = net.connect(remotePort, remoteAddr, function () {
                        console.log(`connecting : ${remoteAddr}:${remotePort}`);
                        socket.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), function (err) {
                            if (err) {
                                console.error(`error:${err.message}`);
                                return socket.destroy();
                            }
                            remote.pipe(socket);
                            socket.pipe(remote);
                        });
                    });
                    remote.on('error', function (err) {
                        console.error(`连接到远程服务器 ${remoteAddr}:${remoteAddr} 失败,失败信息:${err.message}`);
                        remote.destroy();
                        socket.destroy();
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        });
    });
    socket.on('error', function (err) { console.error(`error:${err.message}`); });
});
server.listen(3000);
 console.log('listen')
