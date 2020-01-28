
exports.extractRoute = (input) => {
    const routes = {};
    const cacheForMinimunCost = {};
    if (input != null) {
        input.forEach(route => {
            const source = route[0];
            const destination = route[1];
            const cost = parseInt(route.slice(2));
            if (routes[source] == null) {
                routes[source] = {};
            }
            if (routes[source][destination] == null) {
                routes[source][destination] = [];
            }
            if (cost > 0) {
                if (cacheForMinimunCost[`${source}${destination}`] == null) {
                    cacheForMinimunCost[`${source}${destination}`] = cost;
                }
                else {
                    cacheForMinimunCost[`${source}${destination}`] = Math.min(cost, cacheForMinimunCost[`${source}${destination}`]);
                }
                routes[source][destination].push(cost);
            }
        });
        return { routes, cacheForMinimunCost };
    }
    return {};
}

exports.calculateCost = (str, routes, cacheForMinimunCost) => {
    if (typeof str === 'string') {
        let list = str.split(''),
            startFrom = list.shift(),
            result = 0;
        for (let town of list) {
            if (routes[startFrom] != null && routes[startFrom][town] != null) {
                result += cacheForMinimunCost[`${startFrom}${town}`];
                startFrom = town;
            }
            else {
                return 'No Such Route';
            }
        }
        return result;
    }
    return null;
}

// console.log('1.1 : ', calculateCost('ABE'));
// console.log('1.2 : ', calculateCost('AD'));
// console.log('1.3 : ', calculateCost('EACF'));
// console.log('1.4 : ', calculateCost('ADF'));

exports.possibleRoute = (source, destination, routes, condition = { allowRouteTwice: false }) => {
    let result = 0;
    const paths = {
        pathArr: [],
        costOrdered: []
    };
    const calculatedPossibleRoute = (source, destination, condition, count = 0, trackRoute = '', totalCost = 0, path = source, costs = '') => {
        if (condition.maximunStop != null && count > condition.maximunStop) return;
        if (condition.lessThan != null && totalCost >= condition.lessThan) return;
        if (source === destination && count !== 0) {
            ++result;
            paths.pathArr.push(path);
            paths.costOrdered.push(costs.slice(0, -1).split(',').map(cost => parseInt(cost)));
            if (condition.lessThan == null || !condition.allowRouteTwice) return;
        }

        trackRoute += source;
        ++count;

        for (let town in routes[source]) {
            routes[source][town].forEach((numCost, index) => {
                if (condition.allowRouteTwice || !trackRoute.includes(`${source}${town}${index}`)) {
                    calculatedPossibleRoute(town, destination, condition, count, `${trackRoute}${town}${index}`, totalCost + numCost, `${path}${town}`, `${costs}${numCost},`);
                }
            });
        }
        return;
    }
    calculatedPossibleRoute(source, destination, condition);
    return { possible: result, paths };
}

// console.log('2.1 : ', possibleRoute('E', 'D', { maximunStop: 4, allowRouteTwice: false }));
// console.log('2.2 : ', possibleRoute('E', 'E', { allowRouteTwice: false }));
// console.log('2.3 : ', possibleRoute('E', 'E', { allowRouteTwice: true, lessThan: 20 }));