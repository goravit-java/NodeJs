const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg");
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const doc = await Product.find();
        res.render('index', { product: doc });
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

router.get('/add-product', (req, res) => {
    if (req.session.login) {
        res.render('form.ejs');
    } else {
        res.render('admin.ejs');
    }

});
router.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('password');
    res.clearCookie('login');
    res.redirect('/manage');
}
);
router.get('/manage', async (req, res) => {

    if (req.session.login) {
        try {
            const doc = await Product.find();
            res.render('manage.ejs', { product: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    } else {
        res.render('admin.ejs');
    }

});

router.get('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/manage');
    } catch (err) {
        console.log(err);
        res.status(500).send('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
});

router.post('/insert', upload.single('image'), async (req, res) => {
    let data = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    });
    await data.save();
    res.redirect('/');
});

router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.log(`Invalid id requested: ${productId}`);
        return res.status(400).send('Invalid product id');
    }

    try {
        const doc = await Product.findById(productId);
        if (!doc) {
            return res.status(404).send('Product not found');
        }
        res.render('product.ejs', { product: doc });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/edite', async (req, res) => {
    const editId = req.body.edite_id;
    const doc = await Product.findById(editId);
    res.render('edit.ejs', { product: doc });
});

router.post('/update', async (req, res) => {
    const updateId = req.body.update_id;
    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    await Product.findByIdAndUpdate(updateId, data, { useFindAndModify: false });
    res.redirect('/manage');
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const timeExprire = 20000
    if (username === 'admin' && password === '1234') {
        req.session.username = username;
        req.session.password = password;
        req.session.login = true;
        req.session.cookie.maxAge = timeExprire; // Set session expiration time
        res.redirect('/manage');
    } else {
        res.render('404.ejs');
    }
});


module.exports = router;
