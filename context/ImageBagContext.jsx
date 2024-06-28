import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from "react-native"
import { exists } from '../utils/misc';


const ImageBagContext = createContext();

export const ImageBagProvider = ({ children }) => {
    // sera un bag de imagenes, habra diferentes categorias, y de esas categorias habra diferentes imagenes

    /**
     * Estructura de imageBag
     *      {
     *          "NOMBRE CATEGORIA": {
     *              images: [base64, ... ] // array de base64 de imagenes
     *              maxImages: 3 // maximo de imagenes que se pueden agregar a esta categoria
     *      },
     *      {
     *          "NOMBRE OTRA CATEGORIA": {
     *              ...
     *      },
     *     ...
     * }
     */
    const [imageBag, setImageBag] = useState({});

    // Las categorias se actualizan solas cuando se agrega una nueva categoria en imageBag
    const imageBagCategories = exists(imageBag) ? Object.keys(imageBag) : [];

    async function getImageBagCategory(category) {
        if (imageBagCategories.includes(category)) {
            return imageBag[category]
        }
        return null;
    }

    async function removeImageBagCategory(category) {
        if (imageBagCategories.includes(category)) {
            setImageBag(prevImgBag => Object.filter(prevImgBag, (key) => key !== category))
        }
    }

    async function getImageFromImageBag(category, index) {
        const imageBag = await getImageBagCategory();

        if (exists(imageBag)) {
            if (index >= 0 && index < imageBag.maxImages) {
                if (imageBag[category].images.length > index) {
                    return imageBag[category].images[index]
                }
            }
        }

        return null
    }

    async function addImageToBag(category, image) {
        const categoryBag = imageBag[category];

        if (exists(categoryBag)) {
            if (categoryBag.images.length < categoryBag.maxImages) {
                categoryBag.images.push(image)
            } else {
                Alert.alert("No se pueden agregar mas imagenes a esta categoria")
            }

        }
    }

    async function removeImageFromBag(category, image) {
        const categoryBag = imageBag[category];

        if (exists(categoryBag)) {
            const index = categoryBag.images.indexOf(image);

            if (index !== -1) categoryBag.images.splice(index, 1)
        }
    }

    return (
        <ImageBagContext.Provider value={{ imageBag, getImageBagCategory, getImageFromImageBag, addImageToBag, removeImageFromBag, removeImageBagCategory }}>
            {children}
        </ImageBagContext.Provider>
    )


}

export const useImageBag = () => {
    const context = useContext(ImageBagContext);
    if (context === undefined) {
        throw new Error('useImageBag must be used within a ImageBagProvider');
    }
    return context;
}

export default ImageBagContext;