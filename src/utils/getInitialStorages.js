import { useSessionStore } from "../store/useSessionStore";
import { getUniqueValues } from "./getUniqueValues";

export const getInitialStorages = (products) => {

    const uniqueStorages = getUniqueValues(products, 'storageOptions');
    return uniqueStorages.reduce((prev, current) => ({...prev, [current]: false}), {});
}
