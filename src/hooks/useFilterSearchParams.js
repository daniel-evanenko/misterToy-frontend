import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setFilterBy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from "../services/util.service.js";


export function useFilterSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))
    }, [])


    function setFilterSrcParams(filterBy) {
        setSearchParams(utilService.getExistingProperties(filterBy))
    }

    return setFilterSrcParams
}