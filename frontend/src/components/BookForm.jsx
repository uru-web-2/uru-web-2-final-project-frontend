
import React, {useState} from "react";
import CoverImage from "../components/CoverImage";
import { Box,Typography} from "@mui/material";
import { useForm, useFieldArray } from 'react-hook-form'
import './CSS/Form.css'


function BookForm() {

    const {register,handleSubmit, formState: { errors }, control} = useForm();

    const { fields: autors, append: appendAutor, remove: removeAutor } = useFieldArray({control, name: "autores"});
    
    const { fields: categorias, append: appendCategoria, remove: removeCategoria } = useFieldArray({control, name: "categorias"});

    const [autorInput, setAutorInput] = useState('');
    const [categoriaInput, setCategoriaInput] = useState('');

    const handleAddAutor = () => {
        if (autorInput.trim() !== '') {
            appendAutor({autor: autorInput});
            setAutorInput(''); 
        }
    };

    const handleRemoveAutor = (index) => {
        removeAutor(index);
    };

    const handleAddCategoria = () => {
        if (categoriaInput.trim() !== '') {
            appendCategoria({categoria: categoriaInput});
            setCategoriaInput('');
        }
    };

    const handleRemoveCategoria = (index) => {
        removeCategoria(index);
    };


    
    const onSubmit = (data) => {
        console.log('Datos del formulario:', data);
    };
    

  return (
    <div className="form-container">

                    <div className="form-top-group"> 
                        <Typography variant="h4" sx={{color:'#1A4568', fontWeight: 'bold'}}>Libro</Typography>
                    </div>
                    
                    <div className='form-content'>

                            <div className="form-left-group">

                                <div className="form-cover-image">
                                    <CoverImage image='https://picsum.photos/200/300'/>
                                </div>
                                
                                {/* Campo: Número de páginas */}
                                <div className="form-input">

                                    <label htmlFor="nroPaginas">Número de páginas:</label>
                                    <input
                                    type="number"
                                    id="nroPaginas"
                                    {...register('nroPaginas', {
                                        required: 'El número de páginas es obligatorio',
                                        valueAsNumber: true,
                                        min: { value: 1, message: 'Debe tener al menos 1 página' },
                                    })}
                                    />
                                    {errors.nroPaginas && <span>{errors.nroPaginas.message}</span>}
                                </div>

                                {/* Campo: Fecha de publicación */}
                                <div className="form-input">
                                    <label htmlFor="fechaPublicacion">Fecha de publicación:</label>
                                    <input
                                    type="date"
                                    id="fechaPublicacion"
                                    {...register('fechaPublicacion', {
                                        required: 'La fecha de publicación es obligatoria',
                                    })}
                                    />
                                    {errors.fechaPublicacion && <span>{errors.fechaPublicacion.message}</span>}
                                </div>

                                {/* Campo: Idioma (Select) */}
                                <div className="form-input">
                                    <label htmlFor="idioma">Idioma:</label>
                                    <select
                                    id="idioma"
                                    {...register('idioma', { required: 'El idioma es obligatorio' })}
                                    >
                                    <option value="">Selecciona un idioma</option>
                                    <option value="es">Español</option>
                                    <option value="en">Inglés</option>
                                    <option value="fr">Francés</option>
                                    <option value="de">Alemán</option>
                                    </select>
                                    {errors.idioma && <span>{errors.idioma.message}</span>}
                                </div>
                                

                            </div>

                            <div className="form-right-group">

                                {/* Campo: Título */}
                                <div className="form-input">
                                    <label htmlFor="titulo">Título:</label>
                                    <input
                                    type="text"
                                    id="titulo"
                                    {...register('titulo', { required: 'El título es obligatorio' })}
                                    />
                                    {errors.titulo && <span>{errors.titulo.message}</span>}
                                </div>

                                {/* Campo: ISBN */}
                                <div className="form-input">
                                    
                                    <label htmlFor="isbn">ISBN:</label>
                                    <input
                                    type="number"
                                    id="isbn"
                                    {...register('isbn', {
                                        required: 'El ISBN es obligatorio',
                                        valueAsNumber: true, 
                                    })}
                                    />
                                    {errors.isbn && <span>{errors.isbn.message}</span>}
                                </div>

                                {/* Campo: Edición */}
                                <div className="form-input">
                                    <label htmlFor="edicion">Edición:</label>
                                    <input
                                    type="text"
                                    id="edicion"
                                    {...register('edicion', { required: 'La edición es obligatoria' })}
                                    />
                                    {errors.edicion && <span>{errors.edicion.message}</span>}
                                </div>

                                {/* Campo: Editorial */}
                                <div className="form-input">
                                    <label htmlFor="editorial">Editorial:</label>
                                    <input
                                    type="text"
                                    id="editorial"
                                    {...register('editorial', { required: 'El título es obligatorio' })}
                                    />
                                    {errors.editorial && <span>{errors.editorial.message}</span>}
                                </div>
                                
                                {/* Campo: Descripción (textarea) */}
                                <div className="form-input">
                                    <label htmlFor="descripcion">Descripción:</label>
                                    <textarea
                                    id="descripcion"
                                    {...register('descripcion', {
                                        required: 'La descripción es obligatoria',
                                        minLength: {
                                        value: 500,
                                        message: 'La descripción debe tener al menos 10 caracteres',
                                        },
                                    })}
                                    />
                                    {errors.descripcion && <span>{errors.descripcion.message}</span>}
                                </div>
                            </div>

                            <div className="form-bottom-group">

                                {/* Campo: Autores */}
                                <div className="form-input-list">
                                    <div className="form-input">
                                        <label htmlFor="Autor">Autor:</label>
                                        <Box display='flex' alignItems='center' gap={1}>
                                        <input
                                            type="text"
                                            id="Autor"
                                            value={autorInput}
                                            onChange={(e) => setAutorInput(e.target.value)}
                                            required
                                        />
                                            <button onClick={handleAddAutor}>+</button>
                                        </Box> 
                                    </div> 
                                    {autors.map((field) => (
                                        <div className="form-input-list-item" key={field.id}>
                                            <input type="text" value={field.autor} readOnly />
                                            <button onClick={() => handleRemoveAutor(field.id)}>X</button>
                                        </div>
                                    ))}
                                </div>


                                <div className="form-input-list">
                                    <div className="form-input">
                                        <label htmlFor="Categoria">Categoria:</label>
                                        <Box display='flex' alignItems='center' gap={1}>
                                        <input
                                            type="text"
                                            id="Categoria"
                                            value={categoriaInput}
                                            onChange={(e) => setCategoriaInput(e.target.value)}
                                            required
                                        />
                                            <button onClick={handleAddCategoria}>+</button>
                                        </Box> 
                                    </div> 
                                    {categorias.map((field) => (
                                        <div className="form-input-list-item" key={field.id}>
                                            <input type="text" value={field.categoria} readOnly />
                                            <button onClick={() => handleRemoveCategoria(field.id)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div>
                                    
                    <div className="form-button">
                        <button onClick={handleSubmit(onSubmit)}>Enviar</button>
                    </div>
                </div>
  );
}

export default BookForm;