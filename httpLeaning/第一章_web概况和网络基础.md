# web概况和网络基础

## 一、TCP/IP 协议族

![image-20221230112748034](https://raw.githubusercontent.com/zhiyanzhaijie/typoraImg/main/img/202212301127071.png)

1、应用层发送请求http报文，

2、接着，传输层对报文进行分割，分割后每段报文会被打上序号及端口号，

3、网络层增加通讯目的地的MAC地址转发给链路层，至此，通信请求准备齐全

4、链路层进行数据传输，对接客户端与服务器。

## 二、TCP的三次握手

![image-20221230120030414](https://raw.githubusercontent.com/zhiyanzhaijie/typoraImg/main/img/202212301200453.png)



发送端首先syn包确认是否送达，接收端返回syn/ack包确认送达，当收到此反馈后，发送端发送ack包，结束本次数据传输。若其中某个过程中断，TCP协议会以相同的顺序发送相同的数据包。

## 三、DNS服务

​		dns协议提供根据域名查找ip地址及根据ip地址反查找域名的服务。













































