let files=[];

function handleUpload(){
  let f=document.getElementById('fileInput').files[0];
  if(!f) return alert("اختر ملف");
  files.push(f);
  render();
}

function render(){
  let c=document.getElementById('fileList');
  c.innerHTML="";
  files.forEach((f,i)=>{
    c.innerHTML+=`
      <div class='file-card'>
        <b>${f.name}</b> (${f.type})
        <button onclick="makeQR(${i})">QR</button>
        <button onclick="openFile(${i})">فتح</button>
      </div>`;
  });
}

function makeQR(i){
  let file=files[i];
  let url=URL.createObjectURL(file);
  new QRious({
    element: document.getElementById('qrCanvas'),
    value: url,
    size: 300
  });
  document.getElementById('qrPage').style.display='block';
}

function closeQR(){
  document.getElementById('qrPage').style.display='none';
}

function downloadQR(){
  let canvas = document.getElementById('qrCanvas');
  let link = document.createElement('a');
  link.download = "qr.png";
  link.href = canvas.toDataURL();
  link.click();
}

function openFile(i){
  let url=URL.createObjectURL(files[i]);
  window.open(url,"_blank");
}
