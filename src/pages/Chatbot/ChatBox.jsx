import { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Em rất sẵn lòng hỗ trợ Anh/Chị 😊", sender: "bot" },
  ]);

  const sendMessage = (msg) => {
    setMessages([...messages, { text: msg, sender: "user" }]);
    setTimeout(() => {
      setMessages([...messages, { text: msg, sender: "user" }, { text: "Đây là danh sách sản phẩm bạn cần!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, textAlign: "right" }}>
      {!open && (
        <Button
          variant="contained"
          sx={{ borderRadius: "50%", p: 2, minWidth: 0 }}
          onClick={() => setOpen(true)}
        >
          <ChatBubbleOutlineIcon />
        </Button>
      )}

      {open && (
        <Paper sx={{ p: 2, width: 300 }}>
          <Typography variant="h6" color="primary">Điện Máy XANH</Typography>
          {messages.map((msg, index) => (
            <Typography key={index} sx={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
              {msg.text}
            </Typography>
          ))}
          <Button variant="outlined" onClick={() => sendMessage("Danh sách tivi được ưa chuộng nhất")}>Danh sách tivi</Button>
          <Button variant="outlined" sx={{ mt: 1 }} onClick={() => sendMessage("Top 5 máy lạnh bán chạy")}>Top 5 máy lạnh</Button>
          <Button color="error" onClick={() => setOpen(false)}>Đóng</Button>
        </Paper>
      )}
    </Box>
  );
};

export default Chatbot;
