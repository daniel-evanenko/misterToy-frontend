import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const toy_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getPriceStats
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService
        .query(toy_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.byStock) {
                toys = toys.filter(toy => filterBy.byStock === 'inStock'
                    ? toy.inStock === true
                    : filterBy.byStock === 'outOfStock'
                        ? toy.inStock !== true
                        : true)
            }

            if (Array.isArray(filterBy.byLabels) && filterBy.byLabels.length > 0) {
                toys = toys.filter(toy => Array.isArray(toy.labels) && filterBy.byLabels.every(label => toy.labels.includes(label)))

            }
            if (filterBy.sortBy) {
                switch (filterBy.sortBy) {
                    case 'name':
                        toys = toys.sort((a, b) => a.name.localeCompare(b.name))
                        break
                    case 'price':
                        toys = toys.sort((a, b) => b.price - a.price)
                        break
                    case 'created':
                        toys = toys.sort((a, b) => b.createdAt - a.createdAt)
                        break
                    default:
                        break;
                }
            }

            return toys
        })
}
function get(toyId) {
    return storageService
        .get(toy_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(toy_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // TOY - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(toy_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()
        toy.labels = utilService.getRandomLabels()
        toy.imgUrl = 'https://images.pexels.com/photos/13584249/pexels-photo-13584249.jpeg'
        return storageService.post(toy_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '', inStock = false) {
    return { name, price, inStock }
}

function getDefaultFilter() {
    return { name: '', byStock: 'all', byLabels: [], sortBy: 'name' }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getPriceStats() {
    return storageService
        .query(toy_KEY)
        .then(toys => {
            const toyCountByPriceMap = _getToyCountByPriceMap(toys)
            const data = Object
                .keys(toyCountByPriceMap)
                .map(priceName => ({ title: priceName, value: toyCountByPriceMap[priceName] }))
            return data
        })

}

function _createToys() {
    let toys = utilService.loadFromStorage(toy_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            toys.push(_createToy())
        }
        utilService.saveToStorage(toy_KEY, toys)
    }
}

function _createToy() {
    const toy = {
        _id: utilService.makeId(),
        name: utilService.getRandomName(),
        price: utilService.getRandomIntInclusive(10, 200),
        labels: utilService.getRandomLabels(),
        imgUrl: 'https://images.pexels.com/photos/13584249/pexels-photo-13584249.jpeg',
        inStock: Math.random() > 0.5
    }
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService
        .query(toy_KEY)
        .then((toys) => {
            const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
            const nextToy = toys[toyIdx + 1]
                ? toys[toyIdx + 1]
                : toys[0]
            const prevToy = toys[toyIdx - 1]
                ? toys[toyIdx - 1]
                : toys[toys.length - 1]
            toy.nextToyId = nextToy._id
            toy.prevToyId = prevToy._id
            return toy
        })
}

function _getToyCountByPriceMap(toys) {
    const toyCountByPriceMap = toys.reduce((map, toy) => {
        if (toy.price < 30)
            map.low++
        else if (toy.price < 70)
            map.normal++
        else
            map.high++
        return map
    }, {
        low: 0,
        normal: 0,
        high: 0
    })
    return toyCountByPriceMap
}
