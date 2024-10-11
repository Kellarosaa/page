document.getElementById('addTextBox').addEventListener('click', function() {
    const textBox = document.createElement('div');
    textBox.className = 'text-box';
    textBox.contentEditable = true;
    textBox.innerText = 'Editable Text';
    textBox.style.left = '50px';
    textBox.style.top = '50px';
    makeDraggable(textBox);
    document.getElementById('canvas').appendChild(textBox);
});

document.getElementById('addImage').addEventListener('click', function() {
    const imageBox = document.createElement('div');
    imageBox.className = 'image-box';
    imageBox.style.left = '150px';
    imageBox.style.top = '150px';
    makeDraggable(imageBox);
    document.getElementById('canvas').appendChild(imageBox);
});

function makeDraggable(element) {
    element.onmousedown = function(event) {
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        element.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };
    };

    element.ondragstart = function() {
        return false;
    };
}

// PDF Download functionality can be implemented using libraries like jsPDF
