import AsyncStorage from '@react-native-async-storage/async-storage';

//Store data in localstorage
export const storeItem = async <T>(key: string, value: T): Promise<T> => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (error) {
        throw error;
    }
};

// get data from localstorage
export const getItem = async <ReturnType>(key: string): Promise<ReturnType> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        throw error;
    }
};

// clear all data in localstorage
export const clearLocalStorage = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        throw error;
    }
};

// remove data from localstore
export const removeItem = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (error) {
        return error;
    }
};
