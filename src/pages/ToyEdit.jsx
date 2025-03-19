import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { addUserActivity } from "../store/actions/user.actions.js"
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { Button, FormControlLabel, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Checkbox from '@mui/material/Checkbox';

const EditToySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    inStock: Yup.boolean()
})




function CustomInput({ handleExternalChange, ...props }) {
    const { name, onChange } = props

    const handleChange = (e) => {
        onChange(e)
        if (handleExternalChange) handleExternalChange(e)
    }

    return (
        <TextField
            {...props}
            id="outlined-basic"
            label={name}
            variant="outlined"
            onChange={handleChange}
        />
    )
}



function CustomCheckbox({ handleExternalChange, ...props }) {
    const { name, value, onChange } = props
    const handleChange = (e) => {
        onChange(e)
        if (handleExternalChange) handleExternalChange(e)
    }
    return (
        <FormControlLabel
            control={
                <Checkbox
                    name={name}
                    checked={!!value}
                    onChange={handleChange}
                />
            }
            label={name}
        />
    )
}



export default function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const hasUnsavedChanges = useRef(false)
    useConfirmTabClose(hasUnsavedChanges.current)

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function formValidationClass(errors, touched) {
        const isError = !!Object.keys(errors).length
        const isTouched = !!Object.keys(touched).length
        if (!isTouched) return ''
        return isError ? 'error' : 'valid'
    }

    function loadToy() {
        setIsLoading(true)
        toyService.get(params.toyId)
            .then(setToyToEdit)
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false));
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
        hasUnsavedChanges.current = true
    }

    function onSaveTodo() {
        saveToy({ ...toyToEdit })
            .then((savedToy) => {
                navigate('/toy')
                const action = toyToEdit._id ? 'updated' : 'added'
                addUserActivity(`Toy '${toyToEdit.name}' was ${action} `)
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.log('err:', err)
            })

    }

    const { name, inStock, price } = toyToEdit
    const loadingClass = isLoading ? "loading" : "";

    return (
        <section className={`toy-edit ${loadingClass}`}>
            <Formik
                enableReinitialize
                initialValues={{
                    name: name || '',
                    price: price || '',
                    inStock: inStock || false,
                }}
                validationSchema={EditToySchema}
                onSubmit={onSaveTodo}
            >
                {({ errors, touched }) => {
                    const formClass = formValidationClass(errors, touched)
                    return (
                        <Form className={formClass}>
                            <Field
                                as={CustomInput}
                                name="name"
                                handleExternalChange={handleChange}
                            />

                            {errors.name && touched.name && (
                                <div>{errors.name}</div>
                            )}
                            <Field
                                as={CustomInput}
                                name="price"
                                type='number'
                                handleExternalChange={handleChange}
                            />

                            {errors.price && touched.price && (
                                <div>{errors.price}</div>
                            )}

                            <Field
                                as={CustomCheckbox}
                                name="inStock"
                                handleExternalChange={handleChange}
                            />
                            <button type="submit" className={formClass} >Save</button>

                        </Form>
                    )
                }}
            </Formik>

        </section>
    )
    // return (
    //     <section className={`toy-edit ${loadingClass}`}>
    //         <form onSubmit={onSaveTodo} >
    //             <label htmlFor="txt">Name:</label>
    //             <input onChange={handleChange} value={name} type="text" name="name" id="name" />
    //             <label htmlFor="txt">Price:</label>
    //             <input onChange={handleChange} value={price} type="number" name="price" id="price" />
    //             <div>
    //                 <label htmlFor="inStock">InStock:</label>
    //                 <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />
    //             </div>

    //             <button>Save</button>
    //         </form>
    //     </section>
    // )
}

