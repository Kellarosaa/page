document.getElementById('addTextBox').addEventListener('click', function() {
    const textBox = document.createElement('div');
    textBox.className = 'text-box';
    textBox.contentEditable = true;
    textBox.style.left = '50px';
    textBox.style.top = '50px';
    textBox.innerText = 'Edit me!';
    textBox.onmousedown = function(e) {
        let shiftX = e.clientX - textBox.getBoundingClientRect().left;
        let shiftY = e.clientY - textBox.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            textBox.style.left = pageX - shiftX + 'px';
            textBox.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        textBox.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            textBox.onmouseup = null;
        };
    };

    document.getElementById('canvas').appendChild(textBox);
});

document.getElementById('uploadImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.left = '100px';
    img.style.top = '100px';
    img.onload = function() {
        URL.revokeObjectURL(img.src);
    };
    img.onmousedown = function(e) {
        let shiftX = e.clientX - img.getBoundingClientRect().left;
        let shiftY = e.clientY - img.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            img.style.left = pageX - shiftX + 'px';
            img.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        img.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            img.onmouseup = null;
        };
    };

    document.getElementById('canvas').appendChild(img);
});

// Functionality to download as PDF can be implemented using libraries like jsPDF
