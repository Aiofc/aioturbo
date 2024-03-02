import CryptoJS from "crypto-js";
import {BizTreeData, BizTreeDataList, TreeData, TreeDataList} from "../types";

/**
 *加密处理
 */
export function encryption(src: string, keyWord: string) {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 加密
    var encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: key,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });
    return encrypted.toString();
}

/**
 *  解密
 * @param {*} params 参数列表
 * @returns 明文
 */
export function decryption(src: string, keyWord: string) {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 解密逻辑
    var decryptd = CryptoJS.AES.decrypt(src, key, {
        iv: key,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });

    return decryptd.toString(CryptoJS.enc.Utf8);
}

export function BizDataToTreeData(dataList: BizTreeDataList): TreeDataList {
    // Step 1: Create a map for all items
    let map: { [key: string]: TreeData } = {};

    // Step 2: Store each item in the map
    dataList.forEach(item => {
        map[item.id] = {...item, children: []};
    });

    let roots: TreeDataList = [];

    // Step 3: Build the tree structure
    dataList.forEach((item: BizTreeData) => {
        if (item.parentId && map[item.parentId]) {
            // @ts-ignore
            map[item.parentId].children.push(map[item.id]);
        } else {
            roots.push(map[item.id]);
        }
    });

    // Step 4: Remove 'children' property from nodes without children
    Object.values(map).forEach(item => {
        if (item.children && item.children.length === 0) {
            delete item.children;
        }
    });
    // Step 5: Return the roots array
    return roots;
}

export function TreeDataToBizData(dataList: TreeDataList): BizTreeDataList {
    let list: BizTreeDataList = [];

    function flatten(item: {
        children?: TreeData[];
        name: string;
        description: string | null;
        active: boolean;
        id: string;
    }, id?: string) {
        let bizItem: BizTreeData = {
            id: item.id,
            name: item.name,
            description: item.description,
            parentId: null, // This will be set when calling flatten for each child
            active: item.active
        };

        list.push(bizItem);

        if (item.children) {
            item.children.forEach(child => flatten(child, item.id));
        }
    }

    dataList.forEach(child => flatten(child));

    return list;
}
/**
 * 统一批量导出
 * @method  encryption 加密处理
 */

const other = {
    encryption: (src: string, keyWord: string) => {
        return encryption(src, keyWord);
    },
    decryption: (src: string, keyWord: string) => {
        return decryption(src, keyWord);
    },
};

// 统一批量导出
export default other;
