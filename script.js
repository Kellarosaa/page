document.getElementById('addTextBox').addEventListener('click', function() {
    const textBox = document.createElement('div');
    textBox.className = 'text-box';
    textBox.contentEditable = true;
    textBox.innerText = 'Edit me!';
    textBox.style.left = '50px';
    textBox.style.top = '50px';
    document.getElementById('canvas').appendChild(textBox);
    makeDraggable(textBox);
});

document.getElementById('uploadImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'image-box';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.left = '100px';
        img.style.top = '100px';
        document.getElementById('canvas').appendChild(img);
        makeDraggable(img);
    };
    reader.readAsDataURL(file);
});

function makeDraggable(element) {
    let offsetX, offsetY;
    element.onmousedown = function(e) {
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.onmousemove = function(e) {
            element.style.left = (e.clientX - offsetX) + 'px';
            element.style.top = (e.clientY - offsetY) + 'px';
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

document.getElementById('downloadPDF').addEventListener('click', function() {
    // PDF download functionality to be implemented
    alert('PDF download functionality is not yet implemented.');
});
