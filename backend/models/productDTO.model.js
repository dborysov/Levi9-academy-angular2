module.exports = class Product {
    constructor({id, category, title, brand, price, image, description, details, date}) {
        this.id = id
        this.category = category
        this.title = title
        this.brand = brand
        this.price = price
        this.image = image
        this.description = description
        this.details = details
        this.date = date
    }
}