module.exports = class Product {
    constructor({_id, category, title, brand, price, image, description, details, date}) {
        return {
            id: _id,
            category,
            title,
            brand,
            price,
            image,
            description,
            details,
            date
        };
    }
}