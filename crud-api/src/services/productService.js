import db from "../config/database.js";

class ProductService {
    constructor() {
    }

    findAll() {
        return new Promise((resolve, reject) => {
            db.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            db.query(`insert into product values (${product.id}, '${product.name}', ${product.price}, ${product.quantity});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            db.query(`select * from product where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(products[0])
                }
            })
        })
    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE id = ${idDelete}`, (err, delProduct) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delProduct);
                }
            });


        });
    }


    update(idEdit,product) {
        return new Promise((resolve, reject) => {
            db.query(

                `update product
                        set     
                        id  = ${idEdit},
                        name = '${product.name}', 
                 
                        price = '${product.price}',
                        quantity = '${product.quantity}'
                        
                       
                  
                    where id = ${idEdit}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)

                    }
                })
        })

    }

}

export default new ProductService();
