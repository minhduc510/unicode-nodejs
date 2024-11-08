# API Documentation

**Base URL**: `http://localhost:5000`

## Cách Gán Token

Khi kết nối đến server qua `Socket.IO`, cần gửi kèm token trong phần `auth` để xác thực người dùng. Đoạn mã ví dụ dưới đây minh họa cách gán `token` khi kết nối.

```javascript
const socket = io('BASE_URL', { 
    auth: {
        token: token // Token xác thực của người dùng
    }
});

## 1. ChatSocketService

**ChatSocketService** quản lý các sự kiện chat, bao gồm gửi và nhận tin nhắn giữa các người dùng đã xác thực. Các sự kiện được xử lý thông qua `Socket.IO`.

### Cấu trúc

- **Middleware Xác Thực**: Sử dụng `verifyToken` để xác thực người dùng qua token.

### Các Sự Kiện

- **connection**: Kích hoạt khi người dùng kết nối vào namespace `/chat`.
- **sendMessage**: 
  - Dữ liệu gửi:
    - `receiver_id`: ID người nhận
    - `message_type`: Loại tin nhắn
    - `content`: Nội dung tin nhắn
  - **Xử lý**: Tin nhắn sẽ được lưu vào cơ sở dữ liệu và gửi đến người nhận (nếu đang trực tuyến).

- **receiveMessage**: Phát tin nhắn mới đến tất cả client, bao gồm thông tin người gửi và nội dung tin nhắn.

- **disconnect**: Kích hoạt khi người dùng ngắt kết nối.

---

## 2. VideoSocket

**VideoSocket** quản lý các sự kiện gọi video thời gian thực. Người dùng có thể thực hiện và nhận cuộc gọi video.

### Cấu trúc

- **Middleware Xác Thực**: Sử dụng `verifyToken` để xác thực người dùng qua token.

### Các Sự Kiện

- **connection**: Kích hoạt khi người dùng kết nối vào namespace `/video`.
  - Server phát sự kiện `"me"` để gửi `socket.id` của người dùng đến client.

- **disconnect**: Phát sự kiện `callEnded` đến tất cả người dùng khác khi ngắt kết nối.

- **callUser**:
  - Dữ liệu gửi:
    - `userToCall`: `socket.id` của người dùng được gọi.
    - `signalData`: Dữ liệu tín hiệu WebRTC.
    - `from`: `socket.id` của người gọi.
    - `name`: Tên của người gọi.
  - **Xử lý**: Phát tín hiệu gọi đến người dùng được chỉ định.

- **answerCall**:
  - Dữ liệu gửi:
    - `to`: `socket.id` của người gọi.
    - `signal`: Dữ liệu tín hiệu WebRTC của người nhận.
  - **Xử lý**: Phát tín hiệu trả lời đến người gọi.

---

**Lưu ý**: Middleware `verifyToken` đảm bảo rằng chỉ người dùng đã xác thực mới có thể tham gia chat và video call.
