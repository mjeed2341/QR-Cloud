let files=[];

// اكتشاف نوع الملف وإرجاع أيقونة
function getFileIcon(type){
    if(type.includes("pdf")) return "https://img.icons8.com/color/48/000000/pdf.png";
    if(type.includes("word") || type.includes("doc")) return "https://img.icons8.com/color/48/000000/ms-word.png";
    if(type.includes("sheet") || type.includes("excel") || type.includes("xls")) return "https://img.icons8.com/color/48/000000/ms-excel.png";
    if(type.includes("powerpoint")) return "https://img.icons8.com/color/48/000000/ms-powerpoint.png";
    if(type.includes("image")) return "https://img.icons8.com/color/48/000000/image.png";
    if(type.includes("video")) return "https://img.icons8.com/color/48/000000/video.png";
    if(type.includes("audio")) return "https://img.icons8.com/color/48/000000/audio.png";
    return "https://img.icons8.com/color/48/000000/file.png";
}

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
        <img class="file-icon" src="${getFileIcon(f.type)}">
        <b>${f.name}</b>
        <button onclick="viewFile(${i})">عرض</button>
        <button onclick="editFile(${i})">تعديل</button>
        <button onclick="makeQR(${i})">QR</button>
      </div>`;
  });
}

// عرض الملف داخل التطبيق
function viewFile(i){
    const file = files[i];
    const url = URL.createObjectURL(file);
    const viewer = document.getElementById("viewerFrame");

    // PDF يعمل مباشر
    if(file.type.includes("pdf")){
        viewer.src = url;
    } 
    else {
        // Word - Excel - PowerPoint
        viewer.src = "https://docs.google.com/gview?embedded=true&url=" + url;
    }

    viewer.style.display = "block";
    document.getElementById("closeViewer").style.display = "block";
}

// وضع التعديل
function editFile(i){
    alert("ميزة التعديل سوف يتم تطويرها في النسخة القادمة ❤️");
}

function closeViewer(){
    document.getElementById("viewerFrame").style.display = "none";
    document.getElementById("closeViewer").style.display = "none";
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
