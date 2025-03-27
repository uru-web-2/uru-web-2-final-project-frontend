import React, { useState } from "react";
import CoverImage from "../CoverImage";
import { Box, Typography,Button } from "@mui/material";
import { useForm, useFieldArray } from 'react-hook-form';
import '../CSS/Form.css';

function BookForm() {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [availabilityType, setAvailabilityType] = useState('');

    const { fields: authors, append: appendAuthor, remove: removeAuthor } = useFieldArray({ control, name: "authors" });
    const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({ control, name: "categories" });

    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');

    const handleAvailabilityChange = (event) => {
        setAvailabilityType(event.target.value);
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
                <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Book</Typography>
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
                        {errors.pageCount && <span>{errors.pageCount.message}</span>}
                    </div>

                    {/* Field: Publication date */}
                    <div className="form-input">
                        <label htmlFor="publicationDate">Publication date:</label>
                        <input
                            type="date"
                            id="publicationDate"
                            {...register('publicationDate', {
                                required: 'Publication date is required',
                            })}
                        />
                        {errors.publicationDate && <span>{errors.publicationDate.message}</span>}
                    </div>

                    {/* Field: Language (Select) */}
                    <div className="form-input">
                        <label htmlFor="language">Language:</label>
                        <select
                            id="language"
                            {...register('language', { required: 'Language is required' })}
                        >
                            <option value="">Select a language</option>
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                        {errors.language && <span>{errors.language.message}</span>}
                    </div>
                </div>

                <div className="form-right-group">
                    {/* Field: Title */}
                    <div className="form-input">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </div>

                    {/* Field: ISBN */}
                    <div className="form-input">
                        <label htmlFor="isbn">ISBN:</label>
                        <input
                            type="number"
                            id="isbn"
                            {...register('isbn', {
                                required: 'ISBN is required',
                                valueAsNumber: true,
                            })}
                        />
                        {errors.isbn && <span>{errors.isbn.message}</span>}
                    </div>

                    {/* Field: Edition */}
                    <div className="form-input">
                        <label htmlFor="edition">Edition:</label>
                        <input
                            type="text"
                            id="edition"
                            {...register('edition', { required: 'Edition is required' })}
                        />
                        {errors.edition && <span>{errors.edition.message}</span>}
                    </div>

                    {/* Field: Publisher */}
                    <div className="form-input">
                        <label htmlFor="publisher">Publisher:</label>
                        <input
                            type="text"
                            id="publisher"
                            {...register('publisher', { required: 'Publisher is required' })}
                        />
                        {errors.publisher && <span>{errors.publisher.message}</span>}
                    </div>

                    {/* Field: Description (textarea) */}
                    <div className="form-input">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 500,
                                    message: 'Description must have at least 500 characters',
                                },
                            })}
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                    </div>
                </div>

                <div className="form-bottom-group">
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

                <div className="form-bottom-group-2">
                    <Box display='flex' gap={26.5} marginTop={5}>
                        <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Availability</Typography>
                        <div className="form-input">
                            <select
                                id="type"
                                {...register('type', { required: true })}
                                onChange={handleAvailabilityChange}
                                value={availabilityType}
                            >
                                <option value="">Select a format</option>
                                <option value="physical">Physical</option>
                                <option value="digital">Digital</option>
                                <option value="mixed">Mixed</option>
                            </select>
                        </div>
                    </Box>
                    <Box display='grid' gap={2}>
                        <Box display='flex' justifyContent={'space-between'} marginRight={3}>
                            {/* Field: Number of copies */}
                            <div className={`form-input ${availabilityType === 'digital' ? 'disabled-input' : ''}`}>
                                <label htmlFor="copyCount">Number of copies:</label>
                                <input
                                    type="number"
                                    id="copyCount"
                                    {...(availabilityType === 'physical' && register('copyCount', {
                                        required: true,
                                        valueAsNumber: true,
                                        min: { value: 1, message: 'Must have at least 1 copy' },
                                    }))}
                                    disabled={availabilityType === 'digital'}
                                />
                            </div>

                            {/* Field: Shelf */}
                            <div className={`form-input ${availabilityType === 'digital' ? 'disabled-input' : ''}`}>
                                <label htmlFor="shelf">Shelf:</label>
                                <input
                                    type="text"
                                    id="shelf"
                                    {...(availabilityType === 'physical' && register('shelf', { required: true }))}
                                    disabled={availabilityType === 'digital'}
                                />
                            </div>

                            {/* Field: Section */}
                            <div className={`form-input ${availabilityType === 'digital' ? 'disabled-input' : ''}`}>
                                <label htmlFor="section">Section:</label>
                                <input
                                    type="text"
                                    id="section"
                                    {...(availabilityType === 'physical' && register('section', { required: true }))}
                                    disabled={availabilityType === 'digital'}
                                />
                            </div>
                        </Box>

                        <Box display='flex' justifyContent={'space-between'} marginRight={3}>
                            {/* Field: Format */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="format">Format:</label>
                                <select
                                    id="format"
                                    disabled={availabilityType === 'physical'}
                                    {...(availabilityType === 'digital' && register('format', { required: true }))}
                                >
                                    <option value="">Select a format</option>
                                    <option value="PDF">PDF</option>
                                    <option value="EPUB">EPUB</option>
                                </select>
                            </div>

                            {/* Field: File */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="file">File:</label>
                                <input
                                    type="file"
                                    id="file"
                                    {...(availabilityType === 'digital' && register('file', { required: true }))}
                                    disabled={availabilityType === 'physical'}
                                />
                            </div>

                            {/* Field: Link */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="link">Link:</label>
                                <input
                                    type="text"
                                    id="link"
                                    {...(availabilityType === 'digital' && register('link', { required: true }))}
                                    disabled={availabilityType === 'physical'}
                                />
                            </div>
                        </Box>
                    </Box>
                </div>
            </div>

            <div className="form-button">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Cancel</Button>
            </div>
        </div>
    );
}

export default BookForm;