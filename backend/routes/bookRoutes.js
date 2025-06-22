import express from 'express';

import cloudinary from '../lib/cloudinary.js';
import Book from '../Models/Book.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new book
router.post('/', protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    console.log(req.body);

    // Validate the request body
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    // save to database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    console.log(newBook);

    await newBook.save();
    res.status(201).json({ message: 'Book created successfully', book: newBook });



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating book' });
  }
});


// Get all books and Add Paginations and infinite loading
router.get('/', protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1; 
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit; 

    const books = await Book.find()
    .sort({ createdAt: -1 })
    .skip(skip) 
    .limit(limit) 
    .populate('user', 'username profileImage');

    // Get the total number of books
    const totalBooks = await Book.countDocuments(); 

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit), // Calculate total pages
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// delete a book
router.delete('/:id', protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the user is the owner of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this book' });
    }

    // Delete the image from cloudinary
    if (book.image && book.image.includes('cloudinary')) {
      try {
        const publicId = book.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
        return res.status(500).json({ message: 'Error deleting image from Cloudinary' });
      }
    }


    await book.deleteOne();
    res.status(200).json({ message: 'Book deleted successfully' });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// get recommended books by the logged user
router.get('/recommended', protectRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'username profileImage');

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recommended books' });
  }
});

export default router;