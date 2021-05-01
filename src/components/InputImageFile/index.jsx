import { useEffect, useState } from 'react';

const InputImageFile = ({ className, id, name, accept, limitSizeMB, initImageUri, onValidChange = () => {}, onValueChange = () => {} }) => {
    const [previewImageUri, setPreviewImageUri] = useState(initImageUri);
    const [isValidSize, setIsValidSize] = useState(true);

    useEffect(() => {
        onValueChange(previewImageUri);
    }, [previewImageUri]);

    useEffect(() => {
        onValidChange(isValidSize);
    }, [isValidSize]);

    return (
        <>
            <input
                className="hidden"
                id={id}
                name={name}
                type="file"
                accept={accept}
                onChange={(event) => {
                    let binaryData = [];
                    binaryData.push(event.target.files[0]);

                    let url = URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }));
                    setPreviewImageUri(url);

                    if (event.target.files[0].size <= limitSizeMB * 1e6) {
                        setIsValidSize(true);
                    } else {
                        setIsValidSize(false);
                    }
                }}
            />
            <div className={`absolute ${className}`}>
                {!isValidSize && <p className="w-80 mt-80 py-2 text-red-400 italic text-center rounded-lg ">ขนาดไฟล์เกิน {limitSizeMB} MB</p>}
            </div>
            <img
                className={`w-80 h-80 shadow-md opacity-70 cursor-pointer object-cover hover:bg-gray-200 ${className}`}
                id="img-preview"
                alt="preview"
                src={previewImageUri}
                onMouseEnter={() => {
                    document.getElementById('img-preview').src = '/images/upload-image.png';
                }}
                onMouseOut={() => {
                    document.getElementById('img-preview').src = previewImageUri;
                }}
                onClick={() => {
                    document.getElementById(id).click();
                }}
            />
        </>
    );
};

export default InputImageFile;
