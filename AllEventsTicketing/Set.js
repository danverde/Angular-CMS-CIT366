/*eslint-env browser*/
/*eslint no-unused-vars: 1*/

function Set() {
    this.intersection = function (listA, listB) {

        if (listA == null || listB == null) {
            return null;
        }

        var resultList = [];

        /*------------------------------- My code here -------------------------------------*/
        listA.forEach(function (aItem) {
            listB.forEach(function (bItem) {
                if (bItem === aItem) {
                    resultList.push(bItem);
                }
            });
        });
        /*------------------------------- My code here -------------------------------------*/

        return resultList;
    }

    this.union = function (listA, listB) {

        if (listA == null || listB == null) {
            return null;
        }

        var resultList = [];

        /*------------------------------- My code here -------------------------------------*/
        resultList = listA
            .concat(listB)
            .filter(function (item, i, list) {
                if (list.indexOf(item) == i)
                    return true;
            });
        /*------------------------------- My code here -------------------------------------*/

        return resultList;
    }

    this.relativeComplement = function (listA, listB) {

        if (listA == null || listB == null) {
            return null;
        }

        var resultList = [];

        /*------------------------------- My code here -------------------------------------*/
        resultList = listA.filter(function (aItem) {
            if (listB.indexOf(aItem) === -1)
                return true;
        });
        /*------------------------------- My code here -------------------------------------*/

        return resultList;
    }

    this.symmetricDifference = function (listA, listB) {

        if (listA == null || listB == null) {
            return null;
        }

        var resultList = [];

        /*------------------------------- My code here -------------------------------------*/
        resultList = listA.filter(function (aItem) {
            if (listB.indexOf(aItem) === -1)
                return true;
        }).concat(listB.filter(function (bItem) {
            if (listA.indexOf(bItem) === -1)
                return true;
        }));
        /*------------------------------- My code here -------------------------------------*/

        return resultList;
    }
}
