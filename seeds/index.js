const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'DC9EallWXuYDzW8Ky5E-RDQ0NEdHVGeTZxu_lbA7rB0',
                collections: 483251,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}




const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 40; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '645a4817d2d6d8c0a8b03f9e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, nesciunt vitae doloremque architecto accusantium odit! Expedita sunt neque tempore quos repudiandae. Voluptatum reiciendis suscipit cumque necessitatibus quasi illo. Quo, error?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },

            images: [
                {
                    url: 'https://res.cloudinary.com/dujqhnnvn/image/upload/v1685159340/YelpCamp/spybxufj35s27uszbw78.jpg',
                    filename: 'YelpCamp/spybxufj35s27uszbw78',
                  },
                  {
                    url: 'https://res.cloudinary.com/dujqhnnvn/image/upload/v1685159342/YelpCamp/sjm31u5xeuwjyvuahlsw.jpg',
                    filename: 'YelpCamp/sjm31u5xeuwjyvuahlsw',
                
                  }
              
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
