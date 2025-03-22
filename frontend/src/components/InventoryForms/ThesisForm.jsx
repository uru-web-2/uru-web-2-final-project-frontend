import React, { useState } from "react";
import CoverImage from "../CoverImage";
import { Box, Typography, Button } from "@mui/material";
import { useForm, useFieldArray } from 'react-hook-form';
import '../CSS/Form.css';

function ThesisForm() {

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const { fields: authors, append: appendAuthor, remove: removeAuthor } = useFieldArray({ control, name: "authors" });
    const { fields: collaborators, append: appendCollaborator, remove: removeCollaborator } = useFieldArray({ control, name: "collaborators" });
    const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({ control, name: "categories" });

    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [collaboratorInput, setCollaboratorInput] = useState('');

    const handleAddCollaborator = () => {
        if (collaboratorInput.trim() !== '') {
            appendCollaborator({ collaborator: collaboratorInput });
            setCollaboratorInput('');
        }
    };

    const handleRemoveCollaborator = (index) => {
        removeCollaborator(index);
    };

    const handleAddAuthor = () => {
        if (authorInput.trim() !== '') {
            appendAuthor({ author: authorInput });
            setAuthorInput('');
        }
    };

    const handleRemoveAuthor = (index) => {
        removeAuthor(index);
    };

    const handleAddCategory = () => {
        if (categoryInput.trim() !== '') {
            appendCategory({ category: categoryInput });
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (index) => {
        removeCategory(index);
    };

    const onSubmit = (data) => {
        console.log('Form data:', data);
    };

    return (
        <div className="form-container">
            <div className="form-top-group">
                <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Thesis</Typography>
            </div>

            <div className='form-content'>
                <div className="form-left-group">
                    <div className="form-cover-image">
                        <CoverImage image='https://picsum.photos/200/300' />
                    </div>

                    {/* Field: Number of pages */}
                    <div className="form-input">
                        <label htmlFor="pageCount">Number of pages:</label>
                        <input
                            type="number"
                            id="pageCount"
                            {...register('pageCount', {
                                required: 'Number of pages is required',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Must have at least 1 page' },
                            })}
                        />
                    </div>

                    {/* Field: Publication date */}
                    <div className="form-input">
                        <label htmlFor="publicationDate">Publication date:</label>
                        <input
                            type="date"
                            id="publicationDate"
                            {...register('publicationDate', {
                                required: true,
                            })}
                        />
                    </div>

                    {/* Field: Language (Select) */}
                    <div className="form-input">
                        <label htmlFor="language">Language:</label>
                        <select
                            id="language"
                            {...register('language', { required: true })}
                        >
                            <option value="">Select a language</option>
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                </div>

                <div className="form-right-group">
                    {/* Field: Title */}
                    <div className="form-input">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: true })}
                        />
                    </div>

                    {/* Field: Institution */}
                    <div className="form-input">
                        <label htmlFor="institution">Institution:</label>
                        <input
                            type="text"
                            id="institution"
                            {...register('institution', { required: true })}
                        />
                    </div>

                    {/* Field: Faculty */}
                    <div className="form-input">
                        <label htmlFor="faculty">Faculty:</label>
                        <input
                            type="text"
                            id="faculty"
                            {...register('faculty', { required: true })}
                        />
                    </div>

                    {/* Field: Academic Level */}
                    <div className="form-input">
                        <label htmlFor="academic-level">Academic Level:</label>
                        <select
                            id="academic-level"
                            {...register('academicLevel', { required: true })}
                        >
                            <option value="undergraduate">Undergraduate</option>
                            <option value="masters">Masters</option>
                            <option value="doctoral">Doctoral</option>
                            <option value="postgraduate">Postgraduate</option>
                        </select>
                    </div>


                    {/* Field: Description (textarea) */}
                    <div className="form-input">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: true,
                                minLength: {
                                    value: 500,
                                    message: 'Description must be at least 10 characters long',
                                },
                            })}
                        />
                    </div>
                </div>

                <div className="form-bottom-group">
                    {/* Field: Collaborators */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="collaborator">Collaborator:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="collaborator"
                                    value={collaboratorInput}
                                    onChange={(e) => setCollaboratorInput(e.target.value)}
                                    required
                                />
                                <button onClick={handleAddCollaborator}>+</button>
                            </Box>
                        </div>
                        {collaborators.map((field) => (
                            <div className="form-input-list-item" key={field.id}>
                                <input type="text" value={field.collaborator} readOnly />
                                <button onClick={() => handleRemoveCollaborator(field.id)}>X</button>
                            </div>
                        ))}
                    </div>

                    {/* Field: Authors */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="author">Author:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="author"
                                    value={authorInput}
                                    onChange={(e) => setAuthorInput(e.target.value)}
                                    required
                                />
                                <button onClick={handleAddAuthor}>+</button>
                            </Box>
                        </div>
                        {authors.map((field) => (
                            <div className="form-input-list-item" key={field.id}>
                                <input type="text" value={field.author} readOnly />
                                <button onClick={() => handleRemoveAuthor(field.id)}>X</button>
                            </div>
                        ))}
                    </div>

                    {/* Field: Categories */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="category">Category:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="category"
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                    required
                                />
                                <button onClick={handleAddCategory}>+</button>
                            </Box>
                        </div>
                        {categories.map((field) => (
                            <div className="form-input-list-item" key={field.id}>
                                <input type="text" value={field.category} readOnly />
                                <button onClick={() => handleRemoveCategory(field.id)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="form-button">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Cancel</Button>
            </div>
        </div>
    );
}

export default ThesisForm;