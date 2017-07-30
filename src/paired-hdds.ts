class Pair {
    get center() {
        return (this.left + this.right) / 2;
    }
    constructor(public left: number, public right: number) {

    }
}

interface AccCenter {
    distance: number,
    pair: Pair | undefined,
    previous: Pair | undefined,
    mate: Pair | undefined
}

// let input = `5 2
// 6 7
// -1 1
// 0 1
// 5 2
// 7 3`;
// Functions
function findClosestPair(centers: Pair[]) {
    centers = centers.sort((a: Pair, b: Pair) => (a.center - b.center));
    let reduced = centers.reduce((acc: AccCenter, pair: Pair) => {
        if (acc.previous === undefined) {
            acc.previous = pair;
            return acc;
        }
        if (Math.abs(pair.center - acc.previous.center) < acc.distance) {
            acc.distance = Math.abs(pair.center - acc.previous.center) / 2;
            acc.pair = pair;
            acc.mate = acc.previous;
        }
        acc.previous = pair;
        return acc;
    }, { distance: Infinity, pair: undefined, previous: undefined, mate: undefined })
    return reduced;
}

function narrowCenters(centers: Pair[], k: number) {
    let tmpCenters = centers.slice();
    while (tmpCenters.length > k) {
        let reduced = findClosestPair(tmpCenters);
        tmpCenters = tmpCenters.filter(x => x !== reduced.pair);
    }
    return tmpCenters;
}

function processData(input: string) {
    // Start Here...
    let inArr: string[] = input.split(/[\s\n]+/);
    let n = parseInt(inArr.shift() as string);
    let k = parseInt(inArr.shift() as string);
    let pairs: [number, number][] = [];
    while (inArr.length) {
        let left = parseInt(inArr.shift() as string);
        let right = parseInt(inArr.shift() as string);
        pairs.push([left, right]);
    }


    let origCenters: Pair[] = pairs.reduce((acc: Pair[], pair) => {
        acc.push(new Pair(pair[0], pair[1]));
        return acc;
    }, [])

    let newCenters = narrowCenters(origCenters, k);
    let extCenters = origCenters.filter(x => !newCenters.includes(x));
    let costs = extCenters.reduce((acc: any, curr, idxE, arrE) => {
        let costLowest = Infinity;
        let pointLowest: number | undefined = undefined;
        newCenters.forEach((val, idxN, arrN) => {
            const leftCost = Math.abs(curr.left - val.left) + Math.abs(curr.right - val.left);
            const rightCost = Math.abs(curr.left - val.right) + Math.abs(curr.right - val.right);
            if (leftCost < costLowest) {
                costLowest = leftCost;
                pointLowest = val.left;
            }
            if (rightCost < costLowest) {
                costLowest = rightCost;
                pointLowest = val.right
            }
        })
        acc.net += costLowest;
        acc.points.push(pointLowest);
        return acc;
    }, { net: 0, points: [] })

    let newCosts = newCenters.reduce((acc: any, curr, idxE, arrE) => {
        return (acc + Math.abs(curr.right - curr.left));
    }, costs.net)

    console.log(newCosts);
}


/**
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function(input) {
    _input += input;
});

process.stdin.on("end", function() {
    processData(_input);
});

*/
