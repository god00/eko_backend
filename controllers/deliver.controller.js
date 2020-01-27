const deliverService = require('../services/deliver.service');

const mapRoutesId = {}
let countId = 0;

const getRoutesById = (id) => {
    return mapRoutesId[id] ? mapRoutesId[id] : {};
}

exports.addNewRoutes = (req, res, next) => {
    try {
        const { routes, cacheForMinimunCost } = deliverService.extractRoute(JSON.parse(req.body.input));
        if (routes && cacheForMinimunCost) {
            mapRoutesId[countId] = { routes, cacheForMinimunCost };
            return res.status(200).json({ id: countId++ });
        }
        return res.status(204).json({ errorMsg: 'Invalid parameter' });
    } catch (err) {
        return res.status(400).json({ errorMsg: err });
    }
}

exports.calculateCost = (req, res, next) => {
    try {
        const { routes, cacheForMinimunCost } = getRoutesById(req.body.id);
        if (routes && cacheForMinimunCost && req.body.path) {
            const cost = deliverService.calculateCost(req.body.path, routes, cacheForMinimunCost);
            return res.status(200).json({ id: req.body.id, cost });
        }
        return res.status(204).json({ errorMsg: 'Invalid parameter' });
    } catch (err) {
        return res.status(400).json({ errorMsg: err });
    }
}

exports.possibleRoute = (req, res, next) => {
    try {
        const { routes } = getRoutesById(req.body.id);
        const condition = JSON.parse(req.body.condition);
        if (routes && condition) {
            const { possible, paths } = deliverService.possibleRoute(req.body.source, req.body.destination, routes, condition);
            return res.status(200).json({ id: req.body.id, possible, paths });
        }
        return res.status(204).json({ errorMsg: 'Invalid parameter' });
    } catch (err) {
        return res.status(400).json({ errorMsg: err });
    }
}