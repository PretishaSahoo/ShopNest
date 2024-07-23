import { getStorage, ref, deleteObject } from "firebase/storage";

const deleteFile = async (fileURL) => {
    try {
        const storage = getStorage();
        const fileRef = ref(storage, fileURL);
        await deleteObject(fileRef);
        console.log(`File ${fileURL} deleted successfully.`);
        return true; 
    } catch (error) {
        console.error(`Error deleting file ${fileURL}:`, error);
        throw error; 
    }
};

export default deleteFile;


