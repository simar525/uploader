// script.js

document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const status = document.getElementById('status');
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('progressBar');
    const file = fileInput.files[0];

    if (!file) {
        status.textContent = 'No file selected';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressBar.style.width = percentComplete + '%';
        }
    });

    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            status.textContent = 'File uploaded successfully';
        } else {
            status.textContent = 'File upload failed';
        }
    });

    xhr.addEventListener('error', function () {
        status.textContent = 'File upload failed';
    });

    xhr.addEventListener('abort', function () {
        status.textContent = 'File upload aborted';
    });

    // Set the webhook URL
    const webhookUrl = 'https://hook.integrator.boost.space/hm3iqafwxsba5g25qvk97c2e8480ly5b';

    xhr.open('POST', webhookUrl);
    xhr.send(formData);
});
