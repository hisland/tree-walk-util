(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.treeWalkUtil = {}));
}(this, (function (exports) { 'use strict';

    function getList(parent) {
        if (Array.isArray(parent)) {
            return parent;
        }
        else {
            return [parent];
        }
    }

    function treeWalkDeepInner(list, iterFn, childrenKey, __parent, __stopWhenFound, __lv) {
        if (__lv === void 0) { __lv = 0; }
        var maxLen = list.length;
        for (var ii1 = 0; ii1 < maxLen; ii1++) {
            var item = list[ii1];
            var ret1 = iterFn(item, ii1, list, __parent, __lv);
            if (__stopWhenFound && ret1 !== undefined && ret1 !== false)
                return item;
            if (item[childrenKey]) {
                var ret2 = treeWalkDeepInner(item[childrenKey], iterFn, childrenKey, item, __stopWhenFound, __lv + 1);
                if (__stopWhenFound && ret2 !== undefined && ret2 !== false)
                    return ret2;
            }
        }
    }
    function treeWalkDeep(parent, iterFn, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        treeWalkDeepInner(getList(parent), iterFn, childrenKey, null, false);
    }
    function treeDeepFind(parent, iterFn, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        return treeWalkDeepInner(getList(parent), iterFn, childrenKey, null, true);
    }

    function treeWalkParallelInner(list, iterFn, childrenKey, __parent, __stopWhenFound, __lv) {
        if (__lv === void 0) { __lv = 0; }
        var maxLen = list.length;
        var subList = [];
        for (var ii2 = 0; ii2 < maxLen; ii2++) {
            var item = list[ii2];
            var ret1 = iterFn(item, ii2, list, __parent, __lv);
            if (__stopWhenFound && ret1 !== undefined && ret1 !== false)
                return item;
            if (item[childrenKey]) {
                subList.push(item);
            }
        }
        if (subList.length) {
            var len = subList.length;
            for (var ii3 = 0; ii3 < len; ii3++) {
                var item = subList[ii3];
                var ret2 = treeWalkParallelInner(item[childrenKey], iterFn, childrenKey, item, __stopWhenFound, __lv + 1);
                if (__stopWhenFound && ret2 !== undefined && ret2 !== false)
                    return ret2;
            }
        }
    }
    function treeWalkParallel(parent, iterFn, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        treeWalkParallelInner(getList(parent), iterFn, childrenKey, null, false);
    }
    function treeParallelFind(parent, iterFn, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        return treeWalkParallelInner(getList(parent), iterFn, childrenKey, null, true);
    }

    function treeDeepToList(parent, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        var rs = [];
        treeWalkDeep(parent, function (item) {
            rs.push(item);
        }, childrenKey);
        return rs;
    }
    function treeParallelToList(parent, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        var rs = [];
        treeWalkParallel(parent, function (item) {
            rs.push(item);
        }, childrenKey);
        return rs;
    }

    function listToTree(rawList, idKey, pidKey, childrenKey) {
        var _a;
        if (idKey === void 0) { idKey = 'id'; }
        if (pidKey === void 0) { pidKey = 'pid'; }
        if (childrenKey === void 0) { childrenKey = 'children'; }
        var topLevelList = []; // 最顶层的list
        var allMapById = {}; // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖
        var loopList2 = []; // 临时用于存放有子节点的item
        // 第 1 轮循环, 用 1 个 map 挂所有节点, 并找到顶级节点列表
        for (var _i = 0, rawList_1 = rawList; _i < rawList_1.length; _i++) {
            var item1 = rawList_1[_i];
            allMapById[item1[idKey]] = item1;
            if (item1[pidKey] === null || item1[pidKey] === undefined) {
                topLevelList.push(item1); // 没有父节点设置为顶层
            }
            else {
                loopList2.push(item1);
            }
        }
        // 第 2 轮循环, 根据 pid 找到并挂在父节点下面
        for (var _b = 0, loopList2_1 = loopList2; _b < loopList2_1.length; _b++) {
            var item2 = loopList2_1[_b];
            var parent_1 = allMapById[item2[pidKey]];
            if (parent_1) {
                if (parent_1[childrenKey]) {
                    parent_1[childrenKey].push(item2); // 把自己推入父列表
                }
                else {
                    parent_1[childrenKey] = [item2]; // 父列表不存在, 创建并推入
                }
            }
            else {
                topLevelList.push(item2); // 父节点不存在, 也设置为顶层
            }
        }
        return _a = {},
            _a[childrenKey] = topLevelList,
            _a.map = allMapById,
            _a;
    }

    exports.listToTree = listToTree;
    exports.treeDeepFind = treeDeepFind;
    exports.treeDeepToList = treeDeepToList;
    exports.treeParallelFind = treeParallelFind;
    exports.treeParallelToList = treeParallelToList;
    exports.treeToList = treeDeepToList;
    exports.treeWalkDeep = treeWalkDeep;
    exports.treeWalkParallel = treeWalkParallel;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
