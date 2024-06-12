
import axiosInstance  from "../axiosInstance";

// Функция для получения всех продуктов
export const fetchProducts = async ()  => {
    const responce = await axiosInstance.get('/productts')  
    return responce.data;
}