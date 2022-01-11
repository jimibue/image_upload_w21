import React, { useState } from 'react';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
function UpdateUserImage() {
    const [files, setFiles] = useState([]);
    const [nickname, setNickname] = useState('');

    const handleUpdate = (files)=>{
        // console.log(files)
        // console.log(files[0])
        // console.log(files[0].file)
        setFiles(files)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handle submit clicked')
        console.log('file: ', files[0])
        console.log('nickname: ',nickname)
        let data = new FormData()
        if(files[0] && files[0].file ){
          data.append('fileYo', files[0].file)
        }
        data.append('nickname', nickname)
        try{
          let res = await axios.put('/api/users/image_demo_1', data)
          console.log('res: ', res)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div className="App">
            <h1>only 1 photo and don't do api call on change</h1>
            <form onSubmit={handleSubmit}>
            <FilePond
                files={files}
                onupdatefiles={handleUpdate}
                allowMultiple={false}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
            <p>nickname</p>
            <input value={nickname} onChange={(e)=> setNickname(e.target.value)}/>
            <button type='submit'>update</button>
            </form>
            
        </div>
    );
}

export default UpdateUserImage
