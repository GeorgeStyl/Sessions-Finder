import './FileUploader.css';

import FileUploader from './components/FileUploader';

function ShowApp() {
    return (
        <>
            <h1>React File Upload</h1>

            <FileUploader />

            <p className="read-the-docs">This app is built with Vite and React.</p>
        </>
    );
}

export default ShowApp;