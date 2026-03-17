import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiMessageCircle, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Chatbot() {

const location = useLocation();
const path = location.pathname;

const [open,setOpen] = useState(false);

const [messages,setMessages] = useState([
{text:"Hi! I'm your Invoice Assistant 👋 Ask me about receipts, dashboards, or analytics.",sender:"bot"}
]);

const [input,setInput] = useState("");
const [typing,setTyping] = useState(false);
const [suggestions,setSuggestions] = useState([]);
const [showSuggestions,setShowSuggestions] = useState(true);
const [lastIntent,setLastIntent] = useState(null);

const chatEndRef = useRef(null);

useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages]);

/* ---------------- Context Suggestions ---------------- */

useEffect(()=>{

if(path.includes("dashboard")){

setSuggestions([
"What does the user dashboard have?",
"How do I upload receipts?",
"What analytics does the dashboard provide?",
"Where am I?"
]);

}

else if(path.includes("admin")){

setSuggestions([
"What does the admin dashboard show?",
"What analytics are available?",
"How are invoices processed?",
"Where am I?"
]);

}

else{

setSuggestions([
"What is this app?",
"What features does this app have?",
"How do I use this app?",
"How are receipts processed?"
]);

}

},[path]);

/* ---------------- Proactive Tips ---------------- */

useEffect(()=>{

if(!open) return;

if(path.includes("dashboard")){
addBotMessage("💡 Tip: Click 'New Upload' to upload your first receipt.");
}

if(path.includes("admin")){
addBotMessage("📊 The Admin Dashboard shows invoices, vendors, and revenue insights.");
}

if(path.includes("login")){
addBotMessage("👋 New here? Register an account to start uploading receipts.");
}

},[open,path]);

const addBotMessage = (text) => {
setMessages(prev=>[...prev,{text,sender:"bot"}]);
};

/* ---------------- Location Detection ---------------- */

const getLocationMessage = () => {

if(path.includes("login") || path === "/")
return "You are currently on the Login page.";

if(path.includes("register"))
return "You are on the Registration page.";

if(path.includes("dashboard"))
return "You are on the User Dashboard where receipts can be uploaded and analytics viewed.";

if(path.includes("admin"))
return "You are on the Admin Dashboard.";

return "You are inside the application.";
};

/* ---------------- Intent Detection ---------------- */

const detectIntent = (text) => {

const lower = text.toLowerCase();

if(
  lower.includes("upload") ||
  lower.includes("upload invoice") ||
  lower.includes("upload receipt") ||
  lower.includes("submit invoice") ||
  lower.includes("add receipt") ||
  lower.includes("add invoice") ||
  lower.includes("drag and drop receipt") ||
  lower.includes("where can i upload receipts")
)
  return "upload";

if(
  lower.includes("ocr") ||
  lower.includes("scan") ||
  lower.includes("process receipt") ||
  lower.includes("how does invoice scanning work") ||
  lower.includes("how does receipt scanning work") ||
  lower.includes("how does the system read receipts") ||
  lower.includes("how is data extracted from invoices") ||
  lower.includes("how does ocr read receipts") ||
  lower.includes("how does receipt processing work")
)
  return "ocr";

if(
  lower.includes("dashboard") ||
  lower.includes("what does the dashboard show") ||
  lower.includes("what information is on the dashboard") ||
  lower.includes("what statistics are available") ||
  lower.includes("what can i see in the dashboard") ||
  lower.includes("what data does the dashboard display")
)
  return "dashboard";

if(
  lower.includes("admin") ||
  lower.includes("what does the admin panel show") ||
  lower.includes("what can the admin see") ||
  lower.includes("admin dashboard information") ||
  lower.includes("admin insights") ||
  lower.includes("what does admin dashboard provide")
)
  return "admin";

if(
  lower.includes("analytics") ||
  lower.includes("reports") ||
  lower.includes("insights") ||
  lower.includes("what reports are available") ||
  lower.includes("what insights are available") ||
  lower.includes("how can i track spending") ||
  lower.includes("spending analytics") ||
  lower.includes("invoice statistics")
)
  return "analytics";

if(
  lower.includes("where am i") ||
  lower.includes("which page") ||
  lower.includes("which page am i on") ||
  lower.includes("what page is this") ||
  lower.includes("where am i right now") ||
  lower.includes("am i on the dashboard")
)
  return "location";

return null;

};

/* ---------------- Bot Response ---------------- */

const getBotResponse = (text) => {

const lower = text.toLowerCase();
const intent = detectIntent(text);
/* ---------------- App Info ---------------- */

if(lower.includes("what is this app"))
return "This application helps users upload receipts and invoices, automatically extract important information using OCR, and analyze spending using dashboard analytics.";

if(lower.includes("what features") || lower.includes("features does this app"))
return `Main features of this app include:

• Upload receipts and invoices
• Automatic OCR data extraction
• User dashboard with analytics
• Admin dashboard with revenue insights
• Vendor tracking
• Invoice statistics and reports`;

if(lower.includes("how do i use this app") || lower.includes("how to use this app"))
return `To use this app:

1️⃣ Register or login
2️⃣ Go to the User Dashboard
3️⃣ Click "New Upload"
4️⃣ Upload your receipt or invoice
5️⃣ The system processes it using OCR
6️⃣ View extracted data and analytics in the dashboard`;

if(lower.includes("how are receipts processed") || lower.includes("receipts processed"))
return `Receipts are processed using OCR technology.

The system:
• Scans the uploaded receipt
• Detects text from the image or PDF
• Extracts vendor name, date, and total amount
• Stores the data for dashboard analytics`;

if(intent === "location")
return getLocationMessage();

/* Upload */

if(intent === "upload"){

setLastIntent("upload");

return `To upload a receipt:

1️⃣ Open the User Dashboard
2️⃣ Click **New Upload**
3️⃣ Drag & drop your receipt
4️⃣ Supported formats: PDF, PNG, JPG
5️⃣ The system extracts data automatically using OCR`;

}

/* OCR */

if(intent === "ocr"){

setLastIntent("ocr");

return "Receipts are processed using OCR (Optical Character Recognition) which extracts vendor name, date, and amount from uploaded invoices.";

}

/* User Dashboard */

if(intent === "dashboard"){

setLastIntent("dashboard");

return `The User Dashboard includes:

• Total invoices
• Total invoice value
• Average invoice value
• Export option
• New Upload button
• Drag & drop upload area
• Recent extractions showing processed invoices`;

}

/* Admin Dashboard */

if(intent === "admin"){

setLastIntent("admin");

return `The Admin Dashboard shows:

• Total invoices
• Unique vendors
• Revenue overview
• Top vendors
• Recent uploads`;

}

/* Analytics */

if(intent === "analytics"){

setLastIntent("analytics");

return "The dashboard provides analytics such as invoice statistics, vendor insights, and spending summaries.";

}

/* Conversation Memory */

if(lastIntent === "upload" && lower.includes("format")){
return "Supported file formats are PDF, PNG, and JPG with a maximum size of 10MB.";
}

if(lastIntent === "ocr" && lower.includes("accuracy")){
return "OCR accuracy improves when receipts are clear, well lit, and not blurry.";
}

return "I can help explain the app, dashboards, receipt uploads, OCR processing, and analytics.";

};

/* ---------------- Follow Up ---------------- */

const getFollowUps = (text) => {
  const lower = (text || "").toLowerCase();

  if (lower.includes("what is this app")) {
    return [
      "What features does this app have?",
      "How do I use this app?",
      "How are receipts processed?"
    ];
  }

  if (lower.includes("what features does this app")) {
    return [
      "How do I upload receipts?",
      "How does OCR work?",
      "What analytics does the dashboard show?"
    ];
  }

  if (lower.includes("how do i use this app")) {
    return [
      "How do I upload receipts?",
      "Supported file formats?",
      "Where can I see analytics?"
    ];
  }

  if (lower.includes("how are receipts processed")) {
    return [
      "How does OCR work?",
      "What data is extracted from receipts?",
      "How accurate is OCR?"
    ];
  }

  if (lower.includes("upload")) {
    return [
      "Supported file formats?",
      "Maximum file size?",
      "Where can I upload receipts?"
    ];
  }

  if (lower.includes("ocr")) {
    return [
      "What data does OCR extract?",
      "How accurate is OCR?",
      "What improves OCR accuracy?"
    ];
  }

  if (lower.includes("dashboard")) {
    return [
      "Show dashboard analytics",
      "What statistics are available?",
      "What insights can I view?"
    ];
  }

  // Default fallback
  return [
    "Supported file formats?",
    "How does OCR work?",
    "Show dashboard analytics"
  ];
};

const handleUserMessage = (text) => {

setMessages(prev=>[...prev,{text, sender:"user"}]);
setTyping(true);

setTimeout(()=>{

const reply = getBotResponse(text);

setMessages(prev=>[
...prev,
{text:reply, sender:"bot"},
{text:"You may also ask:", sender:"bot"},
{text:"• "+getFollowUps(text).join("\n• "), sender:"bot"}
]);

setTyping(false);

},600);

};

const sendMessage = () => {

if(!input.trim()) return;

handleUserMessage(input);
setInput("");

};

/* ---------------- UI ---------------- */

return(
<>

{/* Floating Button */}

<div
onClick={()=>setOpen(!open)}
style={{
position:"fixed",
bottom:"18px",
right:"18px",
background:"linear-gradient(135deg,#6366f1,#4f46e5)",
color:"white",
borderRadius:"50%",
width:"58px",
height:"58px",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
boxShadow:"0 10px 25px rgba(0,0,0,0.25)",
zIndex:1100
}}
>
{open ? <FiX size={24}/> : <FiMessageCircle size={24}/>}
</div>

{/* Chat Window */}

{open && (

<div style={{
position:"fixed",
bottom:"90px",
right:"18px",
width:"360px",
height:"65vh",
maxHeight:"520px",
background:"white",
borderRadius:"16px",
boxShadow:"0 20px 45px rgba(0,0,0,0.25)",
display:"flex",
flexDirection:"column",
overflow:"hidden",
zIndex:1000
}}>

{/* Header */}

<div style={{
background:"linear-gradient(135deg,#6366f1,#4f46e5)",
color:"white",
padding:"14px",
fontWeight:"600",
fontSize:"14px"
}}>
Invoice Assistant
</div>

{/* Messages */}

<div style={{
flex:1,
padding:"14px",
overflowY:"auto",
background:"#f8fafc"
}}>

{messages.map((msg,i)=>(
<div key={i} style={{
display:"flex",
justifyContent:msg.sender==="user"?"flex-end":"flex-start",
marginBottom:"10px"
}}>
<div style={{
padding:"9px 12px",
borderRadius:"14px",
maxWidth:"75%",
background:msg.sender==="user"?"#4f46e5":"#e5e7eb",
color:msg.sender==="user"?"white":"#111827",
fontSize:"13px",
whiteSpace:"pre-line"
}}>
{msg.text}
</div>
</div>
))}

{typing && (
<div style={{fontSize:"12px",color:"#6b7280"}}>
Assistant typing...
</div>
)}

<div ref={chatEndRef}></div>

</div>

{/* Suggestions */}

<div style={{
padding:"10px",
borderTop:"1px solid #e5e7eb"
}}>

<div
onClick={()=>setShowSuggestions(!showSuggestions)}
style={{
display:"flex",
justifyContent:"space-between",
cursor:"pointer",
fontSize:"12px",
fontWeight:"600"
}}
>
Suggested Questions
{showSuggestions ? <FiChevronUp/> : <FiChevronDown/>}
</div>

{showSuggestions && (

<div style={{
display:"flex",
flexWrap:"wrap",
gap:"6px",
marginTop:"8px"
}}>

{suggestions.map((s,i)=>(
<button
key={i}
onClick={()=>handleUserMessage(s)}
style={{
fontSize:"11px",
padding:"5px 9px",
borderRadius:"16px",
border:"1px solid #e5e7eb",
background:"#f9fafb",
cursor:"pointer"
}}
>
{s}
</button>
))}

</div>

)}

</div>

{/* Input */}

<div style={{
display:"flex",
borderTop:"1px solid #e5e7eb"
}}>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Ask something..."
style={{
flex:1,
border:"none",
padding:"11px",
outline:"none",
fontSize:"13px"
}}
/>

<button
onClick={sendMessage}
style={{
background:"#4f46e5",
color:"white",
border:"none",
padding:"0 16px",
cursor:"pointer",
fontWeight:"500"
}}
>
Send
</button>

</div>

</div>

)}

</>
);
}