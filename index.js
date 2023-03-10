var express = require('express');

var app = express();

// app.use(express.static(__dirname+'template'))
// app.engine('html',require('ejs').renderFile);
const koneksi = require('./database')
app.set('views','./template')
app.set('view engine', 'ejs')


var _data = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
];


app.get('/',function(req, res) {
    // res.sendFile(__dirname+'/template/read.html')
    var readquery = "SELECT * FROM Barang ";
    koneksi.query(readquery,(err,row,field)=>{
        if (err) {
            return res.status(500).json({message:'something wrong',err:err})
        }
        console.log(row);
        res.render('read',{
            title:'Read Data from database',
            field:["Nama Barang","Harga", "Jumlah Stok"],
            // field:["Nama Barang", "Deskripsi", "Harga", "Jumlah Stok"],
            data:row,

        });
    });
});

app.listen(process.env.server_port,()=>console.log(`Server running at: ${process.env.host}:${process.env.server_port}`));