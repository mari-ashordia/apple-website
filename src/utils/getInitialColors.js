import { useSessionStore } from "../store/useSessionStore";
import { getUniqueValues } from "./getUniqueValues";

export const getInitialColors  = (products) => {
    const uniqueColors = getUniqueValues(products, 'colors');
    return uniqueColors.reduce((prev, current) => ({...prev, [current]: false}), {});
}
