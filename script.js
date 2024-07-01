document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const status = document.getElementById('status');
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        status.textContent = 'No file selected';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://hook.integrator.boost.space/hm3iqafwxsba5g25qvk97c2e8480ly5b', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            status.textContent = 'File uploaded successfully';
        } else {
            status.textContent = 'File upload failed';
        }
    } catch (error) {
        console.error('Error uploading file', error);
        status.textContent = 'File upload failed';
    }
});
