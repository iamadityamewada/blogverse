let carts = [
    {
        title:"Samsung G S21",
        id:343,
        category:"mobile",
        count:1
    },
    {
        title:"iPhone12",
        id:33,
        category:"mobile",
        count:1
    }
]

let count = 30
let id = 343

carts = carts.map(item => {
    if(item.id === id){
        item = {...item, count}
    }
    return item
})

// const obj = carts.find(item => item.id === id)
// const objIndex = carts.indexOf(obj)
// obj.count = count
// carts[objIndex] = obj


console.log(carts);

carts = []


