// create a reference to the model
let InventoryModel = require('../models/inventory');


function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

module.exports.inventoryList = function(req, res, next) {  
    InventoryModel.find((err, inventoryList) => {
        //console.log(inventoryList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // res.render('inventory/list', {
            //     title: 'Inventory List', 
            //     InventoryList: inventoryList,
            //     userName: req.user ? req.user.username : ''
            // })       
            res.status(200).json(inventoryList);
        }
    });
}

// module.exports.displayEditPage = (req, res, next) => {
    
//     let id = req.params.id;

//     InventoryModel.findById(id, (err, itemToEdit) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the edit view
//             res.render('inventory/add_edit', {
//                 title: 'Edit Item', 
//                 item: itemToEdit,
//                 userName: req.user ? req.user.username : ''
//             })
//         }
//     });
// }


module.exports.processEdit = (req, res, next) => {

    let id = req.params.id

    let updatedItem = InventoryModel({
        _id: id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size.h,
            w: req.body.size.w,
            uom: req.body.size.uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    InventoryModel.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).json(
                { 
                    success: false, 
                    message: getErrorMessage(err)
                }
            );
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            // res.redirect('/inventory/list');
            res.status(200).json(
                {
                    success: true,
                    message: 'Item updated successfully.'
                }
            )
        }
    });

}


module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;

    InventoryModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            // res.end(err);
            return res.status(400).json(
                { 
                    success: false, 
                    message: getErrorMessage(err)
                }
            );
        }
        else
        {
            // refresh the book list
            // res.redirect('/inventory/list');
            res.status(200).json(
                {
                    success: true,
                    message: 'Item deleted successfully.'
                }
            )
        }
    });

}


// module.exports.displayAddPage = (req, res, next) => {

//     let newItem = InventoryModel();

//     res.render('inventory/add_edit', {
//         title: 'Add a new Item',
//         item: newItem,
//         userName: req.user ? req.user.username : ''
//     })          

// }

module.exports.processAdd = (req, res, next) => {

    let newItem = InventoryModel({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        size : {
            h: req.body.size.h,
            w: req.body.size.w,
            uom: req.body.size.uom,
        },
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    InventoryModel.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            // res.redirect('/inventory/list');
            res.status(200).json(item);
        }
    });
    
}