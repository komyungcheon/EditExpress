import productService from "../services/productService.js";
import fs from "fs";


class ProductController {

    constructor() {
    }

    findAll(req, res) {
        fs.readFile('views/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            productService.findAll().then((products) => {
                for (const item of products) {
                    str += `<h1>${item.name}, ${item.price}</h1>
                    <a href="/edit/?id"><i class="fa-solid fa-pencil"></i>
                         <button class="btn btn-primary">Edit</button>
                          </a>
                    <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')"
                             href="/api/delete/:id" class="btn btn-danger ms-1"><button>Delete</button></i>
                                    </a>`
                }


                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    showAddForm(req, res) {
        fs.readFile('views/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })

    }
    add(req, res) {
        productService.save(req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }

    showFormEdit(req, res) {
        let idEdit = req.params.id;
        fs.readFile('views/product/edit.html', 'utf-8', (err, stringHTML) => {
            productService.findById(idEdit).then((product) => {
                stringHTML = stringHTML.replace('{id}', product.id);
                stringHTML = stringHTML.replace('{name}', product.name);
                stringHTML = stringHTML.replace('{price}', product.price);
                stringHTML = stringHTML.replace('{quantity}', product.quantity);
                res.write(stringHTML);
                res.end();
            })
        })
    }

    edit(req, res) {
        let idEdit = req.params.id;
            productService.update(idEdit, req.body).then(() => {
                res.writeHead(301,{'location':'/api/products'})
                res.end()
            })
    }
    delete(req, res) {
        let idDelete= req.params.id;
        productService.delete(idDelete, req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }
}

export default new ProductController();
