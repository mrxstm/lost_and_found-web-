
const uploadFile = (req,res) => {
    try {
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({message: "No file uploaded"})
        }
        res.status(200).json({message: "File uploaded successfully!", files:req.files});
    } catch (error) {
    
        res.status(500).json({message: "Error uploading files", error:error.message});
    }
}

export {uploadFile};