## TCP

transport control 协议。是一种**面向连接可靠的**数据传输协议。是为了在不可靠的互联网上提**供可靠的端到端的字节流服务**的一个传输协议。

### 三次握手

三次握手是为了确认双方的接收能力和发送能力正常。建立tcp连接三次握手。

ack=1代表确认。seq序列号。

1. 第一次发送连接请求  seq=x

2. 第二次握手由tcp服务器，如果同意连接就发送确认报文  ack=1 syn=x+1

3. 第三次tcp客户端发送确认。  ack=1  seq=x+1

第三次握手时防止已经失效的连接请求报文突然又传送到了服务器，产生错误，避免多余了连接资源浪费。失效的连接由于tcp服务端没有接收到确认报文，不建立连接。

### 四次挥手

释放tcp连接需要四次挥手。

1. 第一次挥手，tcp客户端发出释放请求fin=1 seq=u

2. 第二次挥手，tcp服务端发送确认报文ACK=1,ack=u+1  客户端终止等待态

3. 第三次挥手，tcp服务端发送释放请求，fin=1  最后确认态

4. 第四次挥手，客户端发送确认报文ack=1

客户端会在发送确认后等待2MSL时间后关闭，服务端直接关闭。