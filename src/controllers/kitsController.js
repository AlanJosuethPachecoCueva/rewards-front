import { getAllKits, getKit, generateKitWithAI, generateImageWithAI, createKit, getKitsImages } from "../models/kitsModel";

const createKitController = async (kitData) => {
    try {
        const res = await createKit(kitData);

        if (!res) {
            console.error("Error creating kit.");
            return false;
        }
        return res;
    } catch (error) {
        console.error(error);
        return false;
    }

}

const getKitsController = async () => {
    try {
        const kits = await getAllKits();

        if (!kits) {
            console.error("Error getting kits");
            return false;
        }

        return kits;
    } catch (error) {
        console.error(error);
        return false;
    }

}


const getKitByIdController = async (id) => {
    try {
        const kit = await getKit(id);

        if (!kit) {
            console.error("Error getting kit.");
            return false;
        }

        return kit;
    } catch (error) {
        console.error(error);
        return false;
    }

}

const generateKitWithAIController = async (prompt) => {
    try {
        const generatedKit = await generateKitWithAI(prompt);

        if (!generatedKit) {
            console.error("Error generating kit with AI.");
            return false;
        }

        return generatedKit;
    } catch (error) {
        console.error(error);
        return false;
    }

}

const generateImageWithAIController = async (prompt) => {
    try {
        const generatedImage = await generateImageWithAI(prompt);

        if (!generatedImage) {
            console.error("Error generating image with AI.");
            return false;
        }

        return generatedImage;
    } catch (error) {
        console.error(error);
        return false;
    }

}

const getKitsImagesController = async () => {
    try {
        const images = await getKitsImages();

        if (!images) {
            console.error("Error getting kits images");
            return false;
        }

        return images;
    } catch (error) {
        console.error(error);
        return false;
    }

}



// const deleteProject = async (id) => {
//     try {
//         const res = await deleteProjectById(id);
//         return res;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }


// }

// const updateProjectById = async (id, data) => {
//     try {
//         const res = await updateProject(id, data);

//         if (!res) {
//             throw new Error("¡Unknow Error!");
//         }
//         return true;
//     }catch(error){
//         return false;
//     }
    
// }

export { getKitsController, getKitByIdController, generateKitWithAIController, createKitController, generateImageWithAIController, getKitsImagesController };